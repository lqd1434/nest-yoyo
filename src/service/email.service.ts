import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { MyRedisService } from './redis.service'

@Injectable()
export class EmailService {
	constructor(private readonly mailerService: MailerService) {}

	async sendEmail(email: string, msg: any) {
		const htmlContent: string = `
		<div>
			<div style='background-color: white;border-radius:25px;box-shadow: 0 0 10px #C0BFC0;padding: 5px'>
				<h2 style='color: darkcyan'>Welcome to yoyo's world, after completing the registration, you will see a different world, now, let's
				 take a look at your registration verification code:
				 <span style='color: darksalmon;text-decoration: blueviolet'>${msg}</span>
				</h2>
			</div>
			<div style='margin-top: 25px;border-radius:25px;background-color: white;box-shadow: 0 0 10px #C0BFC0;padding: 18px;color: crimson'>
				Be careful,Each verification code is valid for only five minutes
			</div>
		</div>
			`
		await this.mailerService.sendMail({
			to: email, // 接收信息的邮箱
			from: '1434288209@qq.com', // 要发送邮件的邮箱
			subject: 'yoyo注册验证码',
			html: htmlContent,
			// html: `<h1 style="color: coral">欢迎注册yoyo,您本次注册的验证码是:<span style='color: blueviolet'>${msg}</span></h1>`,
			template: 'email',
		})
	}
}
