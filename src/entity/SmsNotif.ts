import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
} from "typeorm";

@Entity({ name: "sms_notif" })
export class SmsNotif extends BaseEntity {
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
