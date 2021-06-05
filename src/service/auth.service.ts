import { Injectable } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from '../entity/user.entity'
import { DescriptionEnum, ResponseEntity, ResponseUserInfo, StatusCodeEnum } from '../lib/utils/responseBody'
import { MyRedisService } from './redis.service'
import * as moment from 'moment'

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService, private readonly redisService: MyRedisService) {}

	async doLogin(data): Promise<ResponseEntity<ResponseUserInfo>> {
		const user: User = await this.userService.selectUserByEmail(data.email)
		const res = new ResponseEntity<ResponseUserInfo>()
		if (user) {
			if (user.password === data.password) {
				const userInfo: ResponseUserInfo = { id: user.id, name: user.name, icon: user.icon, gender: user.gender }
				res.setValue({ statusCode: StatusCodeEnum.SUCCESS, dataBody: userInfo, description: DescriptionEnum.LOGIN_SUCCESS })
			} else {
				res.setValue({ statusCode: StatusCodeEnum.PASSWORD_ERR, dataBody: null, description: DescriptionEnum.PASSWORD_ERR })
			}
		} else {
			res.setValue({ statusCode: StatusCodeEnum.NO_USER, dataBody: null, description: DescriptionEnum.NO_USER })
		}
		return res
	}

	async doRegister(data): Promise<any> {
		const { email, name, password, verifyCode } = data
		let date = moment().format('YYYY-MM-DD LTS')
		if (date.substring(date.length - 2) === 'AM') {
			date = date.replace('AM', '')
		} else {
			date = date.replace('PM', '')
		}
		const user = {
			name: name,
			email: email,
			password: password,
			created_at: date,
			updated_at: date,
		}
		const serverSideCode = await this.redisService.get(email)
		this.redisService.del(email)
		if (serverSideCode === verifyCode) {
			const result = await this.userService.addUser(user)
			console.log(result)
			if (result) {
				return { statusCode: 200, msg: '注册成功' }
			} else {
				return { statusCode: 408, msg: '用户已存在' }
			}
		} else {
			return { statusCode: 409, msg: '验证码错误' }
		}
	}
}
