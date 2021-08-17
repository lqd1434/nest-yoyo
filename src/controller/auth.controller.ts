import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { ResponseBody } from '../lib/utils/responseBody'
import { LocalAuthGuard } from '../auth/guards/local-auth.guard'
import { AuthService } from '../service/auth.service'
import { User } from '../entity/user.entity'

@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Req() req: Request): Promise<ResponseBody<any>> {
		return await this.authService.login(req.user as User)
	}

	@Post('register')
	async register(@Req() req: Request): Promise<any> {
		return await this.authService.doRegister(req.body)
	}
}
