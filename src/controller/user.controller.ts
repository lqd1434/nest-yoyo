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

	@Post('password')
	@UseGuards(JwtAuthGuard)
	async changePaw(@Req() req: Request) {
		return await this.userService.changePassword(req.body)
	}

	@Get('icon')
	@UseGuards(JwtAuthGuard)
	async getUserIcon(@Req() req: Request, @Res() res: Response) {
		res.sendFile(req.query.icon.toString())
	}

	@Post('upload')
	@UseGuards(JwtAuthGuard)
	@UseInterceptors(FileInterceptor('file'))
	async upload(@UploadedFile() file, @Req() req: Request) {
		console.log(req.query.id)
		const preUrl = '/project/static/icons/'
		const fileExtension = file.originalname.split('.').pop()
		const filePath = preUrl + req.query.id + '.' + fileExtension
		fs.writeFileSync(filePath, file.buffer)
		const id = req.query.id as string
		return await this.userService.updateUserIcon(id, req.query.id + '.' + fileExtension)
	}
}
