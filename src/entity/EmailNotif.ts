import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
} from "typeorm";

@Entity({ name: "email_notif" })
export class EmailNotif extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	email_id: String;

	@Column()
	notification: String;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@DeleteDateColumn()
	deleted_at: Date;
}
