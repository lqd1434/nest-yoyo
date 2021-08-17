import { Controller, Get, Req } from '@nestjs/common'
import { MessageService } from '../service/message.service'
import { Request } from 'express'

@Controller('msg')
export class MessageController {
	constructor(private readonly messageService: MessageService) {}

	@Get('limit')
	async getMsg(@Req() req: Request): Promise<any> {
		const { count, lastId, from, to } = req.query
		return await this.messageService.getMessageLimit(count as string, lastId as string, from as string, to as string)
	}
}
