import { Module } from '@nestjs/common'
import { MyRedisService } from '../service/redis.service'
import { FriendController } from '../controller/friendship.controller'
import { UserModule } from './user.module'
import { RedisServiceForFriend } from '../service/redisForFriend.service'
import { FriendService } from '../service/friend.service'

@Module({
	imports: [UserModule],
	controllers: [FriendController],
	providers: [MyRedisService, RedisServiceForFriend, FriendService],
	exports: [],
})
export class FriendModule {}
