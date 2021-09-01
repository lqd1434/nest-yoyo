import { UserService } from './user.service'
import { Injectable } from '@nestjs/common'
import { ResponseBody, ResponseUserInfo } from '../lib/utils/responseBody'
import { getConnection, getRepository } from 'typeorm'
import { ChatList } from '../entity/chatList.entity'
import { CODE_SUCCESS } from '../lib/constant/constant'

@Injectable()
export class ChatService {
	constructor(private readonly userService: UserService) {}

	async getOnlineUsers(userIdList: string[]) {
		let userList: ResponseUserInfo[] = []
		for (const item of userIdList) {
			const user = await this.userService.selectUserById(item)
			const userInfo: any = { id: user.id, name: user.name, icon: user.icon }
			userList.push(userInfo)
		}
		return userList
	}

	async creatChatList(userId: number, friendId: number, content: string) {
		const result = await getRepository(ChatList)
			.createQueryBuilder('chatList')
			.where('chatList.userId = :userId AND chatList.friendId = :friendId', {
				userId: userId,
				friendId: friendId,
			})
			.getOne()

		if (result) {
			return await getConnection()
				.createQueryBuilder()
				.update(ChatList)
				.set({ notReadCount: result.notReadCount + 1, lastMessage: content })
				.where('userId = :userId AND friendId = :friendId', {
					userId: userId,
					friendId: friendId,
				})
				.execute()
		} else {
			getConnection().createQueryBuilder().insert().into(ChatList).values({
				userId: userId,
				friendId: friendId,
				lastMessage: content,
				notReadCount: 1,
			})
		}
	}

	async allRead(userId: number, friendId: number) {
		await getConnection()
			.createQueryBuilder()
			.update(ChatList)
			.set({ notReadCount: 0 })
			.where('userId = :userId AND friendId = :friendId', {
				userId: userId,
				friendId: friendId,
			})
			.execute()
	}

	async getChatList(userId: number, friendId: number) {
		let resData: ResponseBody<ChatList[]>
		const data = await getRepository(ChatList)
			.createQueryBuilder('chatList')
			.orderBy('chatList.time', 'DESC')
			.where('chatList.userId = :userId AND chatList.friendId = :friendId', {
				userId: userId,
				friendId: friendId,
			})
			.getMany()
		resData = { statusCode: CODE_SUCCESS, dataBody: data, description: '获取成功' }
		return resData
	}
}
