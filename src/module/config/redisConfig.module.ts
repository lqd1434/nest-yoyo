import { Module } from '@nestjs/common'
import { RedisModule } from 'nestjs-redis'

let options = {
	port: 6379,
	host: '127.0.0.1',
	password: '',
	db: 1,
}
@Module({
	imports: [RedisModule.register(options)],
})
export class redisConfigModule {}
