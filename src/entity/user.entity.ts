import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'users' })
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id?: number

	@Column({ type: 'varchar', name: 'name' })
	name: string

	@Column({ type: 'varchar', name: 'email' })
	email: string

	@Column({ type: 'varchar', name: 'telephone' })
	telephone: string

	@Column({ type: 'varchar', name: 'password' })
	password: string

	@Column({ type: 'varchar', name: 'gender' })
	gender: string

	@Column({ type: 'varchar', name: 'birth' })
	birth: string

	@Column({ type: 'varchar', name: 'sign' })
	sign: string

	@Column({ type: 'varchar', name: 'icon' })
	icon: string

	@CreateDateColumn({ type: 'timestamp', name: 'created_at' })
	created_at?: string

	@UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
	updated_at?: string
}
