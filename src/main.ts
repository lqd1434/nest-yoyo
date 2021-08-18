import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import 'reflect-metadata'
import { SocketIoAdapter } from './adapter/redis-socket'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.useWebSocketAdapter(new SocketIoAdapter(app))
	await app.listen(8080)
}
bootstrap()
