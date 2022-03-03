import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	ManyToOne,
	JoinColumn,
} from "typeorm";
import { Agency } from "./Agency.entity";
import { Status } from "./Status.entity";

@Entity({ name: "sms_notif" })
export class SmsNotif extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	sms_id: String;

	@Column()
	notification: String;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@DeleteDateColumn()
	deleted_at: Date;

	@ManyToOne(() => Status, (status) => status.sms, { cascade: true })
	@JoinColumn()
	status: Status;

	@ManyToOne(() => Agency, (agency) => agency.sms, { cascade: true })
	@JoinColumn()
	agency: Agency;
}
