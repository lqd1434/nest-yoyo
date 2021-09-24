import { Controller, Get, Req } from '@nestjs/common'
import { MessageService } from '../service/message.service'
import { Request } from 'express'
import Mock from 'mockjs'

@Controller('msg')
export class MessageController {
	constructor(private readonly messageService: MessageService) {}

	@Get('limit')
	async getMsg(@Req() req: Request): Promise<any> {
		const { count, lastId, from, to } = req.query
		return await this.messageService.getMessageLimit(
			count as string,
			lastId as string,
			from as string,
			to as string,
		)
	}

	@Get('mock')
	async mock(@Req() req: Request): Promise<any> {
		const Random = Mock.Random
		const data = Mock.mock({
			'list|20': [
				{
					'id|+1': 1,
					'serial_number|1-100': 1,
					'warn_number|1-100': 1,
					'warn_name|1': ['报警类型1', '报警类型2', '报警类型3'],
					'warn_level|1': ['紧急', '重要'],
					warn_detail: '环境IP:10.114.123.12,服务名称:XX',
					create_time: Random.datetime(),
					finish_time: Random.datetime(),
					'contact|4': 'abc',
				},
			],
		})
		return data
	}
}
