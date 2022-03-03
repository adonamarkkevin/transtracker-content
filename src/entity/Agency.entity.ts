import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	OneToOne,
	JoinColumn,
	OneToMany,
} from "typeorm";
import { AgencyType } from "./AgencyType.entity";
import { EmailNotif } from "./EmailNotif.entity";
import { SmsNotif } from "./SmsNotif.entity";
import { Status } from "./Status.entity";

@Entity({ name: "agencies" })
export class Agency extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: String;

	@Column()
	mnemonic: String;

	@Column()
	type: String;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@DeleteDateColumn()
	deleted_at: Date;

	@OneToOne(() => AgencyType, (agency_type) => agency_type.agency)
	@JoinColumn()
	agency_type: AgencyType;

	@OneToMany(() => Status, (status) => status.agency)
	@JoinColumn()
	status: Status[];

	@OneToMany(() => EmailNotif, (email) => email.agency)
	@JoinColumn()
	email: EmailNotif[];

	@OneToMany(() => SmsNotif, (sms) => sms.agency)
	@JoinColumn()
	sms: SmsNotif[];
}
