import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	ManyToOne,
	OneToMany,
} from "typeorm";
import { Agency } from "./Agency.entity";
import { EmailNotif } from "./EmailNotif.entity";
import { SmsNotif } from "./SmsNotif.entity";

@Entity({ name: "status" })
export class Status extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	status_id: String;

	@Column()
	batch_id: String;

	@Column()
	status: String;

	@Column()
	mapping: String;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@DeleteDateColumn()
	deleted_at: Date;

	@ManyToOne(() => Agency, (agency) => agency.status)
	agency: Agency;

	@OneToMany(() => EmailNotif, (email) => email.status, { cascade: true })
	email: EmailNotif[];

	@OneToMany(() => SmsNotif, (sms) => sms.status, { cascade: true })
	sms: SmsNotif[];
}
