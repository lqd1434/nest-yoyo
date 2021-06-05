export enum StatusCodeEnum {
	SUCCESS = 200,
	NOT_FOUND = 404,
	PASSWORD_ERR = 405,
	NO_USER = 406,
	SERVER_ERR = 500,
}

export enum DescriptionEnum {
	GET_SUCCESS = '获取成功',
	GET_ERR = '获取失败',
	LOGIN_SUCCESS = '登录成功',
	PASSWORD_ERR = '密码错误',
	NO_USER = '用户不存在',
	SERVER_ERR = '服务器错误',
	NOT_FOUND = '抱歉,没有找到',
}

export interface ResponseBody<T> {
	statusCode: number
	dataBody: T
	description: string
}
export class ResponseEntity<T> {
	statusCode: number
	dataBody: T
	description: string
	setValue(res: ResponseBody<T>) {
		this.statusCode = res.statusCode
		this.dataBody = res.dataBody
		this.description = res.description
	}
}

export interface ResponseUserInfo {
	id: number
	name: string
	icon: string
	gender: string
}
