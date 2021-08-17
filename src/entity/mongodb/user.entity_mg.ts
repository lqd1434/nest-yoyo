import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm'
import { FriendInfo } from './friend.entity_mg'

@Entity()
export class UserMG {
	@ObjectIdColumn() id: ObjectID
	@Column() userId: number
	@Column() approves: number
	@Column((type) => FriendInfo) friends: FriendInfo[]
}
