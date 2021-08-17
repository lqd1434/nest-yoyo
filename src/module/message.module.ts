import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MyRedisService } from '../service/redis.service'
import { Message } from '../entity/message.entity'
import { MessageService } from '../service/message.service'
import { MessageController } from '../controller/message.controller'
import { UserModule } from './user.module'

@Module({
	imports: [TypeOrmModule.forFeature([Message]), MessageModule, UserModule],
	controllers: [MessageController],
	providers: [MessageService, MyRedisService],
	exports: [MessageService, TypeOrmModule.forFeature([Message])],
})
export class MessageModule {}
