import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'message' })
export class Message extends BaseEntity {
	@PrimaryGeneratedColumn()
	id?: number

	@Column({ type: 'bigint', name: 'from' })
	from: number

	@Column({ type: 'bigint', name: 'to' })
	to: number

	@Column({ type: 'varchar', name: 'content' })
	content: string

	@CreateDateColumn({ type: 'timestamp', name: 'time' })
	time?: string
}
