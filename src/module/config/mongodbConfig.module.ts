import { Module } from '@nestjs/common'
import { createConnection } from 'typeorm'

export const mongoProviders = [
	{
		provide: 'DbConnectionToken',
		useFactory: async () =>
			await createConnection({
				type: 'mongodb',
				host: 'localhost',
				port: 27017,
				database: 'utalk',
				useUnifiedTopology: true,
				entities: ['./**/*.entity_mg.js'],
			}),
	},
]
@Module({
	providers: [...mongoProviders],
	exports: [...mongoProviders],
})
export class MongodbConfigModule {}
