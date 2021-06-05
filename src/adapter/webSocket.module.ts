import { Module } from '@nestjs/common'
import { WebSocketAdapter } from './websocketAdapter'
import { MyRedisService } from '../service/redis.service'
import { ChatModule } from '../module/chat.module'

@Module({
	imports: [ChatModule],
	providers: [WebSocketAdapter, MyRedisService],
})
export class websocketModule {}
