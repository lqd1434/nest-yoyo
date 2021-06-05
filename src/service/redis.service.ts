import { Injectable } from '@nestjs/common'
import IORedis from 'ioredis'
import { RedisService } from 'nestjs-redis'

@Injectable()
export class MyRedisService {
	private client: IORedis.Redis

	constructor(private redisService: RedisService) {
		this.getClient()
	}

	private async getClient() {
		this.client = this.redisService.getClient()
	}

	public async set(key: string, value: any, seconds?: number): Promise<any> {
		value = JSON.stringify(value)
		if (!this.client) {
			await this.getClient()
		}
		if (!seconds) {
			await this.client.set(key, value)
		} else {
			await this.client.set(key, value, 'EX', seconds)
		}
	}

	public async get(key: string): Promise<any> {
		if (!this.client) {
			await this.getClient()
		}
		let data = await this.client.get(key)
		console.log('data', data)
		if (data) {
			return JSON.parse(data)
		} else {
			return null
		}
	}

	public async del(key: string): Promise<any> {
		if (!this.client) {
		}
		await this.client.del(key)
	}

	public async getAllKey() {
		if (!this.client) {
			await this.getClient()
		}
		const count = await this.client.keys('*')
		return count
	}
}
