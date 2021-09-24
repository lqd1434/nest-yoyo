import { Controller, Get, Req } from '@nestjs/common'
import { MessageService } from '../service/message.service'
import { Request } from 'express'
const Mock = require('mockjs')
const Random = Mock.Random

@Controller('msg')
export class MessageController {
	constructor(private readonly messageService: MessageService) {}

	@Get('limit')
	async getMsg(@Req() req: Request): Promise<any> {
		const { count, lastId, from, to } = req.query

		const data = Mock.mock({
			[`list|${count}`]: [
				{
					'id|+1': parseInt(lastId.toString()),
					from: parseInt(from.toString()),
					to: parseInt(to.toString()),
					content: Random.cparagraph(1),
					read: true,
					time: Random.datetime(),
				},
			],
		})
		return data

		// return await this.messageService.getMessageLimit(
		// 	count as string,
		// 	lastId as string,
		// 	from as string,
		// 	to as string,
		// )
	}
}
