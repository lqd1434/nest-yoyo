import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { UserModule } from '../module/user.module'
import { SecurityMiddleware } from './security.middleware'
import { UserController } from '../controller/user.controller'

@Module({
	imports: [UserModule],
})
export class MiddlewareModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(SecurityMiddleware).forRoutes(UserController)
	}
}
