import { Controller, Get, Post, Req } from '@nestjs/common'
import { EmailService } from '../service/email.service'
import { Request } from 'express'
import { MyRedisService } from '../service/redis.service'
import { ResponseBody } from '../lib/utils/responseBody'

@Controller('email')
export class EmailController {
	constructor(private readonly emailService: EmailService, private readonly redisService: MyRedisService) {}

	@Post('send')
	async sendEmail(@Req() req: Request): Promise<any> {
		const email = req.body.email
		const code = await this.createVerifyCode(email)
		await this.emailService.sendEmail(email, code)
		return { statusCode: 200, description: '发送验证码成功', dataBody: null } as ResponseBody<null>
	}

	createVerifyCode = async (email: string) => {
		let code = ''
		for (let i = 1; i < 7; i++) {
			code += Math.floor(Math.random() * 9).toString()
		}
		await this.redisService.set(email, code)
		setTimeout(() => {
			this.redisService.del(email)
		}, 60000)
		return code
	}
}
