import { Module } from '@nestjs/common'
import { RedisModule } from 'nestjs-redis'


let options2 = {
	name: 'redis2',
	port: 6379,
	host: '127.0.0.1',
	password: '',
	db: 2,
}
@Module({
	imports: [RedisModule.register(options2)],
})
export class redisConfigModuleForFriend {}
