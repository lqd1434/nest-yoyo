import { Injectable } from '@nestjs/common'
import IORedis from 'ioredis'
import { RedisService } from 'nestjs-redis'

@Injectable()
export class RedisServiceForFriend {
	private client: IORedis.Redis

	constructor(private redisService: RedisService) {
		this.getClient()
	}

	private async getClient() {
		this.client = this.redisService.getClient('redis2')
	}

	public async addFriend(key: string, friend: string) {
		await this.client.sadd(key, friend)
	}

	public async delFriend(key: string, friend: string) {
		await this.client.srem(key, friend)
	}

	public async isExist(key: string, friendId: string) {
		return await this.client.sismember(key, friendId)
	}

	public async getAllFriends(key: string) {
		let res: any
		await this.client.smembers(key, (_err, data) => {
			res = data
		})
		return res
	}
}
