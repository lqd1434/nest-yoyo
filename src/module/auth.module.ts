import { Module } from '@nestjs/common'
import { AuthController } from '../controller/auth.controller'
import { AuthService } from '../service/auth.service'
import { User } from '../entity/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from '../service/user.service'
import { MyRedisService } from '../service/redis.service'

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	controllers: [AuthController],
	providers: [AuthService, UserService, MyRedisService],
})
export class authModule {}
