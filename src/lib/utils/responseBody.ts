export interface ResponseBody<T> {
	statusCode: number
	dataBody: T
	description: string
}

export interface ResponseUserInfo {
	id: number
	name: string
	birth: string
	icon: string
	gender: string
	sign: string
}
