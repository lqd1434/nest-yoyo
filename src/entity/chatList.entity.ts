import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm'

@Entity({ name: 'chatList' })
export class ChatList extends BaseEntity {
	@PrimaryGeneratedColumn()
	id?: number

	@Column({ type: 'bigint', name: 'userId' })
	userId: number

	@Column({ type: 'bigint', name: 'friendId' })
	friendId: number

	@Column({ type: 'varchar', name: 'lastMessage' })
	lastMessage: string

	@Column({ type: 'int', name: 'notReadCount' })
	notReadCount: number

	@CreateDateColumn({ type: 'timestamp', name: 'time' })
	time?: string
}
