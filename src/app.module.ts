import { Module } from '@nestjs/common'
import { websocketModule } from './adapter/webSocket.module'
import { ConfigModule } from '@nestjs/config'
import { redisConfigModule } from './module/config/redisConfig.module'
import { MysqlConfigModule } from './module/config/mysqlConfig.module'
import { UserModule } from './module/user.module'
import { EmailConfigModule } from './module/config/emailConfig.module'
import { FriendModule } from './module/friend.module'
import { AuthModule } from './module/auth.module'
import { MiddlewareModule } from './middleware/middleware.module'
import { MongodbModule } from './module/mongodb.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		MysqlConfigModule,
		AuthModule,
		UserModule,
		websocketModule,
		redisConfigModule,
		EmailConfigModule,
		FriendModule,
		MiddlewareModule,
		MongodbModule,
	],
})
export class AppModule {}
