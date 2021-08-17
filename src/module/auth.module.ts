import { Module } from '@nestjs/common'
import { AuthController } from '../controller/auth.controller'
import { AuthService } from '../service/auth.service'
import { UserService } from '../service/user.service'
import { MyRedisService } from '../service/redis.service'
import { UserModule } from './user.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from '../auth/constants'
import { LocalStrategy } from '../auth/strategies/local.strategy'
import { JwtStrategy } from '../auth/strategies/jwt.strategy'

@Module({
	imports: [
		UserModule,
		PassportModule,
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '7d' },
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, UserService, MyRedisService, LocalStrategy, JwtStrategy],
	exports: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
