import { Injectable } from '@nestjs/common'
import { User } from '../entity/user.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { ResponseBody } from '../lib/utils/responseBody'
import { CODE_NO_USER, CODE_PSW_ERR, CODE_SUCCESS, GET_SUCCESS, NO_USER, PASSWORD_ERR, UPDATE_SUCCESS } from '../lib/constant/constant'

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

	async selectUserByIdForOnline(id: number | string) {
		const user = await this.useRepository.findOne(id, { select: ['icon', 'name', 'id'] })
		return { id: user.id, name: user.name, icon: user.icon, online: false }
	}

	async selectUserByEmail(email: string): Promise<User> {
		return await this.useRepository.findOne({ email: email })
	}

	async getUserInfo(data): Promise<any> {
		const user: User = await this.useRepository.findOne(data.id)
		delete user.password
		delete user.created_at
		delete user.updated_at
		let resData: ResponseBody<User>
		if (user) {
			resData = { statusCode: CODE_SUCCESS, dataBody: user, description: GET_SUCCESS }
		} else {
			resData = { statusCode: CODE_NO_USER, dataBody: user, description: NO_USER }
		}
		return resData
	}

	async addUser(user: User) {
		return await this.useRepository.save(user)
	}

	async updateUserIcon(id: string | number, icon: string) {
		const user = await this.selectUserById(id)
		let responseData: ResponseBody<string>
		if (user) {
			user.icon = icon
			await this.useRepository.save(user)
			responseData = { statusCode: CODE_SUCCESS, dataBody: icon, description: '上传成功' }
		} else {
			responseData = { statusCode: CODE_NO_USER, dataBody: null, description: NO_USER }
		}
		return responseData
	}

	async updateUser(user: any): Promise<ResponseBody<any>> {
		const { id, name, birth, gender, sign } = user
		const result: User = await this.selectUserById(id)
		let responseData: ResponseBody<null>
		console.log(result)
		if (result) {
			result.gender = gender
			result.birth = birth
			result.name = name
			result.sign = sign
			await this.addUser(result)
			responseData = { statusCode: CODE_SUCCESS, dataBody: null, description: UPDATE_SUCCESS }
		} else {
			responseData = { statusCode: CODE_NO_USER, dataBody: null, description: NO_USER }
		}
		return responseData
	}

	async changePassword(data: any) {
		const { id, oldPassword, newPassword } = data
		const user: User = await this.selectUserById(id)
		let responseData: ResponseBody<null>
		if (user) {
			if (user.password === oldPassword) {
				user.password = newPassword
				await this.addUser(user)
				responseData = { statusCode: CODE_SUCCESS, dataBody: null, description: UPDATE_SUCCESS }
			} else {
				responseData = { statusCode: CODE_PSW_ERR, dataBody: null, description: PASSWORD_ERR }
			}
		} else {
			responseData = { statusCode: CODE_NO_USER, dataBody: null, description: NO_USER }
		}
		return responseData
	}
}
