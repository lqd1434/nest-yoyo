import { UserService } from './user.service'
import { User } from '../entity/user.entity'
import { Injectable } from '@nestjs/common'
import { ResponseUserInfo } from '../lib/utils/responseBody'

@Injectable()
export class ChatService {
	constructor(private readonly userService: UserService) {}

	async getOnlineUsers(userIdList: string[]) {
		let userList: ResponseUserInfo[] = []
		for (const item of userIdList) {
			const user = await this.userService.selectUserById(item)
			const userInfo: any = { id: user.id, name: user.name,icon:user.icon }
			userList.push(userInfo)
		}
		return userList
	}
}
