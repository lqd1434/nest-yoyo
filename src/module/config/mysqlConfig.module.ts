import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: () => ({
				type: 'mysql',
				host: 'localhost',
				port: 3306,
				username: 'root',
				password: '1434288lqd',
				database: 'yoyo',
				charset: 'utf8mb4',
				entities: ['./**/*.entity.js'],
				synchronize: false,
			}),
		}),
	],
})
export class MysqlConfigModule {}
