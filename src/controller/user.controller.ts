import { Controller, Get, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common'
import { Request, Response } from 'express'
import { UserService } from '../service/user.service'
import { FileInterceptor } from '@nestjs/platform-express'
import * as fs from 'fs'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('update')
	async updateUserInfo(@Req() req: Request) {
		console.log(req.body)
	}

	@Get('icon')
	async getUserIcon(@Req() req: Request, @Res() res: Response) {
		// res.sendFile('/project/p3/static/images/' + req.query.icon)
		res.sendFile('/Users/lqd/WebstormProjects/nest-yoyo/src/static/images/' + req.query.icon)
	}

	@Post('upload')
	@UseInterceptors(FileInterceptor('file'))
	async upload(@UploadedFile() file) {
		try {
			fs.writeFileSync('./src/static/images/' + file.originalname, file.buffer)
			// fs.writeFileSync('/project/p3/static/images/' + file.originalname, file.buffer)
			return '上传成功'
		} catch (e) {
			return e
		}
	}
}
