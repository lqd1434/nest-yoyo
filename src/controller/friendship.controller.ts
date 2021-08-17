import { Controller, Get, Post, Req } from '@nestjs/common'
import { Request } from 'express'
import { MyRedisService } from '../service/redis.service'
import { UserService } from '../service/user.service'
import { RedisServiceForFriend } from '../service/redisForFriend.service'
import { ResponseBody } from '../lib/utils/responseBody'
import { CODE_SUCCESS, GET_SUCCESS } from '../lib/constant/constant'
import { FriendService } from '../service/friend.service'

@Controller('friend')
export class FriendController {
	constructor(
		private readonly redisService: MyRedisService,
		private readonly userService: UserService,
		private readonly redisServiceForFriend: RedisServiceForFriend,
		private readonly friendService: FriendService,
	) {}

	@Post('add')
	async addFriend(@Req() req: Request): Promise<ResponseBody<null>> {
		const { id, friendId } = req.body
		let resData: ResponseBody<null>
		await this.redisServiceForFriend.addFriend('u' + id, friendId.toString())
		resData = { statusCode: CODE_SUCCESS, dataBody: null, description: '添加好友成功' }
		return resData
	}

	@Post('del')
	async delFriend(@Req() req: Request): Promise<ResponseBody<null>> {
		const { id, friendId } = req.body
		await this.redisServiceForFriend.delFriend('u' + id, friendId.toString())
		let resData: ResponseBody<null>
		resData = { statusCode: CODE_SUCCESS, dataBody: null, description: '删除好友成功' }
		return resData
	}

	@Get('getAll')
	async getAllFriend(@Req() req: Request): Promise<ResponseBody<any>> {
		return await this.friendService.getAllFriend(req.query.id as string)
	}
}
