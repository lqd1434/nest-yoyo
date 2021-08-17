import { Injectable } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from '../entity/user.entity'
import { ResponseBody, ResponseUserInfo } from '../lib/utils/responseBody'
import { MyRedisService } from './redis.service'
import * as moment from 'moment'
import {
	CODE_NO_USER,
	CODE_PSW_ERR,
	CODE_SUCCESS,
	CODE_USER_EXIST,
	LOGIN_SUCCESS,
	NO_USER,
	PASSWORD_ERR,
	USER_EXIST,
} from '../lib/constant/constant'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly redisService: MyRedisService,
		private readonly jwtService: JwtService,
	) {}

	async doLogin(data): Promise<ResponseBody<ResponseUserInfo>> {
		const user: User = await this.userService.selectUserByEmail(data.email)
		let res: ResponseBody<ResponseUserInfo>
		if (user) {
			if (user.password === data.password) {
				const userInfo: ResponseUserInfo = {
					id: user.id,
					name: user.name,
					birth: user.birth,
					sign: user.sign,
					icon: user.icon,
					gender: user.gender,
				}
				res = { statusCode: CODE_SUCCESS, dataBody: userInfo, description: LOGIN_SUCCESS }
			} else {
				res = { statusCode: CODE_PSW_ERR, dataBody: null, description: PASSWORD_ERR }
			}
		} else {
			res = { statusCode: CODE_NO_USER, dataBody: null, description: NO_USER }
		}
		return res
	}

	async doRegister(data): Promise<any> {
		const { email, name, password, verifyCode } = data
		const user = { name: name, email: email, password: password } as User
		const serverSideCode = await this.redisService.get(email)
		await this.redisService.del(email)
		let resData: ResponseBody<null>
		if (serverSideCode) {
			if (serverSideCode === verifyCode) {
				const result = await this.userService.addUser(user)
				if (result) {
					resData = { statusCode: CODE_SUCCESS, dataBody: null, description: '注册成功' }
				} else {
					resData = { statusCode: CODE_USER_EXIST, dataBody: null, description: USER_EXIST }
				}
			} else {
				resData = { statusCode: 409, dataBody: null, description: '验证码错误' }
			}
		} else {
			resData = { statusCode: 409, dataBody: null, description: '验证码已过期' }
		}
		return resData
	}

	async validateUser(email: string, pass: string): Promise<any> {
		const user = await this.userService.selectUserByEmail(email)
		if (user && user.password === pass) {
			const { password, ...result } = user
			return result
		}
		return null
	}

	async login(user: User) {
		const payload = { username: user.name, sub: user.id }
		let res: ResponseBody<any>
		res = {
			statusCode: CODE_SUCCESS,
			dataBody: {
				access_token: this.jwtService.sign(payload),
				user: user,
			},
			description: LOGIN_SUCCESS,
		}
		return res
	}
}
