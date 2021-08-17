import { Module } from '@nestjs/common'
import { WebSocketAdapter } from './websocketAdapter'
import { MyRedisService } from '../service/redis.service'
import { ChatModule } from '../module/chat.module'
import { MessageModule } from '../module/message.module'

@Module({
	imports: [ChatModule, MessageModule],
	providers: [WebSocketAdapter, MyRedisService],
})
export class websocketModule {}
