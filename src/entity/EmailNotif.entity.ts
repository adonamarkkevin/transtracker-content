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

	@ManyToOne(() => Status, (status) => status.email, { cascade: true })
	@JoinColumn()
	status: Status;

	@ManyToOne(() => Agency, (agency) => agency.email, { cascade: true })
	agency: Agency;
}
