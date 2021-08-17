import { Inject, Injectable } from '@nestjs/common'
import { MongoRepository } from 'typeorm'
import { UserMG } from '../entity/mongodb/user.entity_mg'
import { FriendInfo } from '../entity/mongodb/friend.entity_mg'

@Injectable()
export class MongodbService {
	constructor(
		@Inject('mongoRepositoryToken')
		private readonly mongoRepository: MongoRepository<UserMG>,
	) {}

	public async mongoAddUser(userId: number): Promise<boolean> {
		const res = await this.mongoRepository.insertOne({ userId: userId, approves: 0, friends: [] })
		return res.result.ok === 1
	}

	public async mongoFindOne(userId: number): Promise<UserMG> {
		return await this.mongoRepository.findOne({ userId: userId })
	}

	public async mongoAddFriend(userId: number, friend: FriendInfo): Promise<any> {
		const res = await this.mongoRepository.updateOne({ userId: userId }, { $push: { friends: friend } })
		return res.result.ok === 1
	}

	public async mongoRemoveFriend(userId: number, friendId: number): Promise<any> {
		const res = await this.mongoRepository.updateOne({ userId: userId }, { $pull: { friends: { friendId: friendId } } })
		return res.result.ok === 1
	}

	public async incOrDecApproves(userId: number, count: -1 | 1): Promise<any> {
		const res = await this.mongoRepository.updateOne({ userId: userId }, { $inc: { approves: count } })
		return res.result.ok === 1
	}
}
