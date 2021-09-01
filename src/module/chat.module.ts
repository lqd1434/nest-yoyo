import { Module } from '@nestjs/common'
import { ChatService } from '../service/chat.service'
import { UserModule } from './user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ChatList } from '../entity/chatList.entity'
import { ChatController } from '../controller/chat.controller'

@Module({
	imports: [UserModule, TypeOrmModule.forFeature([ChatList])],
	controllers: [ChatController],
	providers: [ChatService],
	exports: [ChatService, UserModule, TypeOrmModule.forFeature([ChatList])],
})
export class ChatModule {}
