import { Controller, Get, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { Request, Response } from 'express'
import { UserService } from '../service/user.service'
import { FileInterceptor } from '@nestjs/platform-express'
import * as fs from 'fs'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('userInfo')
	@UseGuards(JwtAuthGuard)
	async getUserInfo(@Req() req: Request): Promise<any> {
		return await this.userService.getUserInfo(req.query)
	}

	@Post('update')
	@UseGuards(JwtAuthGuard)
	async updateUserInfo(@Req() req: Request) {
		return await this.userService.updateUser(req.body)
	}

	@Get('icon')
	@UseGuards(JwtAuthGuard)
	async getUserIcon(@Req() req: Request, @Res() res: Response) {
		// res.sendFile('/project/p3/static/images/' + req.query.icon)
		res.sendFile('/Users/lqd/WebstormProjects/nest-yoyo/src/static/images/' + req.query.icon)
	}

	@Post('upload')
	@UseGuards(JwtAuthGuard)
	@UseInterceptors(FileInterceptor('file'))
	async upload(@UploadedFile() file, @Req() req: Request) {
		if (!fs.existsSync('./src/static/images/' + file.originalname)) {
			// fs.writeFileSync('/project/p3/static/images/' + file.originalname, file.buffer)
			fs.writeFileSync('./src/static/images/' + file.originalname, file.buffer)
		}
		console.log('已存在')

		const id = req.query.id as string
		return await this.userService.updateUserIcon(id, file.originalname)
	}

	@Post('password')
	@UseGuards(JwtAuthGuard)
	async changePaw(@Req() req: Request) {
		return await this.userService.changePassword(req.body)
	}
}
