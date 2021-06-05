import { Module } from '@nestjs/common'
import { authModule } from './module/auth.module'
import { websocketModule } from './adapter/webSocket.module'
import { ConfigModule } from '@nestjs/config'
import { redisConfigModule } from './module/config/redisConfig.module'
import { MysqlConfigModule } from './module/config/mysqlConfig.module'
import { UserModule } from './module/user.module'
import { EmailConfigModule } from './module/config/emailConfig.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		MysqlConfigModule,
		authModule,
		UserModule,
		websocketModule,
		redisConfigModule,
		EmailConfigModule,
	],
})
export class AppModule {}
