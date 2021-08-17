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
		this.client = this.redisService.getClient('redis1')
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

	public async getAllKey(): Promise<string[]> {
		if (!this.client) {
			await this.getClient()
		}
		let res = 0
		let list = []
		while (true) {
			const r = await this.client.scan(res, 'count', 100)
			res = parseInt(r[0])
			list = [...list, ...r[1]]
			if (res === 0) {
				break
			}
		}
		list = Array.from(new Set(list))
		return list
	}
}
