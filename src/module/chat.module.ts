import { Module } from '@nestjs/common'
import { ChatService } from '../service/chat.service'
import { UserModule } from './user.module'

@Module({
	imports: [UserModule],
	providers: [ChatService],
	exports: [ChatService, UserModule],
})
export class ChatModule {}
