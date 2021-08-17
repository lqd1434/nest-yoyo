import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../entity/user.entity'
import { getConnection, Repository, getRepository } from 'typeorm'
import { Message } from '../entity/message.entity'

@Injectable()
export class MessageService {
	constructor(
		@InjectRepository(Message)
		private readonly messageRepository: Repository<Message>,
	) {}

	async addMessage(message: Message) {
		return await getConnection().createQueryBuilder().insert().into(Message).values([message]).execute()
	}

	async deleteMessage(id: number) {
		await getConnection().createQueryBuilder().delete().from(Message).where('id = :id', { id: id }).execute()
	}
	async getMessageLimit(count: number | string, lastId: number | string, from: number | string, to: number | string) {
		return getRepository(Message)
			.createQueryBuilder('message')
			.orderBy('message.time', 'DESC')
			.where('message.from = :from AND message.to = :to', { from: from, to: to })
			.orWhere('message.from = :to AND message.to = :from', {
				from: from,
				to: to,
			})
			.skip(parseInt('' + lastId))
			.take(parseInt('' + count))
			.getMany()
	}
}