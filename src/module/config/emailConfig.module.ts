import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { EmailController } from '../../controller/email.controller'
import { EmailService } from '../../service/email.service'
import { MyRedisService } from '../../service/redis.service'

@Module({
	imports: [
		MailerModule.forRootAsync({
			useFactory: () => ({
				transport: 'smtps://1434288209@qq.com:hgkvoqedxmbdfiid@smtp.qq.com',
				defaults: {
					from: '"domain.com" <no-reply@domain.com>',
				},
			}),
		}),
	],
	controllers: [EmailController],
	providers: [EmailService, MyRedisService],
})
export class EmailConfigModule {}
