import { Column } from 'typeorm'

export class FriendInfo {
	@Column() friendId: number
	@Column({ default: Date.now() }) addTime: number
	@Column({ default: false }) approveToday: boolean
}
