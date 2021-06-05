import { Controller, Get, Post, Req } from '@nestjs/common'
import { AuthService } from '../service/auth.service'
import { Request } from 'express'
import { ResponseBody, ResponseUserInfo } from '../lib/utils/responseBody'
import { MyRedisService } from '../service/redis.service'

@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService, private readonly redisService: MyRedisService) {}

	@Post('login')
	async login(@Req() req: Request): Promise<ResponseBody<ResponseUserInfo>> {
		return await this.authService.doLogin(req.body)
	}

	@Post('register')
	async register(@Req() req: Request): Promise<any> {
		return await this.authService.doRegister(req.body)
	}
}
