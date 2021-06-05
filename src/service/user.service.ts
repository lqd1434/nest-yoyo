import { Injectable } from '@nestjs/common'
import { User } from '../entity/user.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly useRepository: Repository<User>,
	) {}
	async selectUserByName(name: string): Promise<User> {
		return await this.useRepository.findOne({ name: name })
	}

	async selectUserById(id: number | string) {
		return await this.useRepository.findOne(id)
	}

	async selectUserByEmail(email: string): Promise<User> {
		return await this.useRepository.findOne({ email: email })
	}

	async addUser(user: any) {
		return await this.useRepository.save(user)
	}
}
