import { Module } from '@nestjs/common'

import { UserService } from '../service/user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../entity/user.entity'
import { UserController } from '../controller/user.controller'

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService, TypeOrmModule.forFeature([User])],
})
export class UserModule {}
