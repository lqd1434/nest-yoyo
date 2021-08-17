import { Injectable } from '@nestjs/common'
import { MyRedisService } from './redis.service'
import { UserService } from './user.service'
import { RedisServiceForFriend } from './redisForFriend.service'
import { ResponseBody } from '../lib/utils/responseBody'
import { CODE_SUCCESS, GET_SUCCESS } from '../lib/constant/constant'

@Injectable()
export class FriendService {
	constructor(
		private readonly redisService: MyRedisService,
		private readonly userService: UserService,
		private readonly redisServiceForFriend: RedisServiceForFriend,
	) {}

	async getAllFriend(id: string | number) {
		const res = await this.redisServiceForFriend.getAllFriends('u' + id)
		const userList = []
		for (const re of res) {
			const result = await this.userService.selectUserByIdForOnline(re)
			userList.push(result)
		}
		for (const r of userList) {
			const res = await this.redisService.get('' + r.id)
			if (res) {
				r.online = true
			}
		}
		let resData: ResponseBody<any>
		resData = { statusCode: CODE_SUCCESS, dataBody: userList, description: GET_SUCCESS }
		return resData
	}
}
