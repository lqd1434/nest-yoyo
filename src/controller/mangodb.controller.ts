import { Controller, Get, Post, Req } from '@nestjs/common'
import { AuthService } from '../service/auth.service'
import { Request } from 'express'
import { ResponseBody, ResponseUserInfo } from '../lib/utils/responseBody'
import { MyRedisService } from '../service/redis.service'
import { MongodbService } from '../service/mongodb.service'

@Controller()
export class MangodbController {
	constructor(private readonly mongodbService: MongodbService) {}

	@Post('test')
	async login(@Req() req: Request): Promise<any> {
		return await this.mongodbService.mongoAddUser(req.body.userId)
	}
}
