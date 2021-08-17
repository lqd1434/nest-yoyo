import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserMG } from '../entity/mongodb/user.entity_mg'
import { MongodbService } from '../service/mongodb.service'
import { MangodbController } from '../controller/mangodb.controller'
import { MongodbConfigModule } from './config/mongodbConfig.module'
import { Connection } from 'typeorm'

export const MongodbPro = [
	{
		// Token可以自己设定
		provide: 'mongoRepositoryToken',
		// User是entity定义的数据实体
		useFactory: (connection: Connection) => connection.getMongoRepository(UserMG),
		inject: ['DbConnectionToken'],
	},
]
@Module({
	imports: [MongodbConfigModule],
	controllers: [MangodbController],
	providers: [MongodbService, ...MongodbPro],
	exports: [MongodbService, MongodbConfigModule],
})
export class MongodbModule {}
