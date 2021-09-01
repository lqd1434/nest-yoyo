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

	async updateMessageState(messageId: number) {
		return await getConnection()
			.createQueryBuilder()
			.update(Message)
			.set({ read: true })
			.where('id = :id', { id: messageId })
			.execute()
	}

	async deleteMessage(id: number) {
		await getConnection().createQueryBuilder().delete().from(Message).where('id = :id', { id: id }).execute()
	}

	async getMessageLimit(count: number | string, lastId: number | string, from: number | string, to: number | string) {
		const messageList = await getRepository(Message)
			.createQueryBuilder('message')
			.orderBy('message.time', 'ASC')
			.where('message.from = :from AND message.to = :to', { from: from, to: to })
			.orWhere('message.from = :to AND message.to = :from', {
				from: from,
				to: to,
			})
			.skip(parseInt('' + lastId))
			.take(parseInt('' + count))
			.getMany()

		for (let message of messageList) {
			await this.updateMessageState(message.id)
		}
		return messageList
	}
}
