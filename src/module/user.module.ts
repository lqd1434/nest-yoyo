import { Module } from '@nestjs/common'
import { UserService } from '../service/user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../entity/user.entity'
import { UserController } from '../controller/user.controller'
import { MyRedisService } from '../service/redis.service'

@Module({
	imports: [TypeOrmModule.forFeature([User]),UserModule],
	controllers: [UserController],
	providers: [UserService,MyRedisService],
	exports: [UserService, TypeOrmModule.forFeature([User])],
})
export class UserModule {}
