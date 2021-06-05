import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'
import { MyRedisService } from '../service/redis.service'
import { ChatService } from '../service/chat.service'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../entity/user.entity'
import { Repository } from 'typeorm'

interface SocketEntity {
	id: number
	socketId: string
	client: Socket
}

@WebSocketGateway({ transports: ['websocket'] })
@Injectable()
export class WebSocketAdapter {
	@WebSocketServer()
	server: Server
	defaultRoom = 'chatroom'

	socketList: SocketEntity[]
	constructor(
		@InjectRepository(User)
		private readonly useRepository: Repository<User>,
		private readonly redisService: MyRedisService,
		private readonly chatService: ChatService,
	) {
		this.socketList = []
	}

	//初始化连接
	async handleConnection(@ConnectedSocket() client: Socket): Promise<string> {
		const userId = client.handshake.query.userId as string
		const userName = client.handshake.query.userName as string
		client.emit('conn', '连接成功')
		//连接后加入默认公共聊天房间
		await this.redisService.set(userId, client.id)
		client.join(this.defaultRoom)
		await this.getActiveGroupUser()

		if (userId && userName) {
			// 用户独有消息房间 根据userId和username
			client.join(userId)
		}
		return '连接成功'
	}

	//断开连接删除Redis中在线状态
	async handleDisconnect(@ConnectedSocket() client: Socket): Promise<any> {
		console.log(client.disconnected)
		if (client.disconnected) {
			const keys = await this.redisService.getAllKey()
			for (const key of keys) {
				console.log(keys)
				const value = await this.redisService.get(key)
				console.log(value)
				console.log('id', client.id)
				if (value === client.id) {
					console.log('断开连接', key)
					await this.redisService.del(key)
					break
				}
			}
		}
	}

	@SubscribeMessage('addFriendToYourRoom')
	async addFriendToYourRoom(@ConnectedSocket() client: Socket, @MessageBody() data: any): Promise<any> {
		if (data.userId && data.friendId) {
			this.server.to(data.userId).emit('addFriendToYourRoom', '创建私聊房间成功')
			console.log(data)
		}
	}

	@SubscribeMessage('message')
	async friendMessage(@ConnectedSocket() client: Socket, @MessageBody() data: any): Promise<any> {
		const { userId, friendId, content } = data
		if (userId && friendId) {
			this.server.to(friendId).emit('message', content)
			client.emit('info', '发送成功')
		}
	}

	async getActiveGroupUser() {
		// 从socket中找到连接人数
		let userIdArr = Object.values(this.server.engine.clients).map((item: any) => {
			return item.request._query.userId
		})
		// 数组去重
		userIdArr = Array.from(new Set(userIdArr))

		console.log(userIdArr)
		const users = await this.chatService.getOnlineUsers(userIdArr)

		this.server.to(this.defaultRoom).emit('activeGroupUser', {
			msg: '在线用户',
			data: users,
		})
	}
}
