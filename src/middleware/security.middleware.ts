import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { createHmac } from 'crypto'

@Injectable()
export class SecurityMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		console.log('Request...,', req.body)
		const hmacresult = createHmac('sha256', 'qwertyuiopasdfgh').update('sky').digest('base64')
		console.log(hmacresult, 'hmacresult')
		console.log(req.body.name, 'name')
		next()
	}
}
