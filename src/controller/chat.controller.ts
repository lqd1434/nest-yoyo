import { Controller, Get, Post, Req } from '@nestjs/common'
import { Request } from 'express'
import { ChatService } from '../service/chat.service'

@Controller('chat')
export class ChatController {
	constructor(private readonly chatService: ChatService) {}

	@Get('list')
	async getChatHistoryList(@Req() req: Request): Promise<any> {
		const { userId, friendId } = req.query
		return await this.chatService.getChatList(
			parseInt(userId as string),
			parseInt(friendId as string),
		)
	}

	@Post('allRead')
	async setAllRead(@Req() req: Request) {
		const { userId, friendId } = req.body
		await this.chatService.allRead(userId, friendId)
	}
}
