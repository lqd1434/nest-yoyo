import { Module } from '@nestjs/common'
import { RedisModule } from 'nestjs-redis'

let options1 = {
	name: 'redis1',
	port: 6379,
	host: '127.0.0.1',
	password: '',
	db: 1,
}
let options2 = {
	name: 'redis2',
	port: 6379,
	host: '127.0.0.1',
	password: '',
	db: 2,
}
@Module({
	imports: [RedisModule.register([options1,options2])],
})
export class redisConfigModule {}



