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
	ManyToOne,
} from "typeorm";
import { AgencyType } from "./AgencyType.entity";
import { EmailNotif } from "./EmailNotif.entity";
import { SmsNotif } from "./SmsNotif.entity";
import { Status } from "./Status.entity";
import { Workgroup } from "./Workgroup.entity";

@Entity({ name: "agencies" })
export class Agency extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	agency_id: String;

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

	@OneToOne(() => AgencyType, (agency_type) => agency_type.agency, {
		cascade: true,
	})
	@JoinColumn()
	agency_type: AgencyType;

	@OneToMany(() => Status, (status) => status.agency, { cascade: true })
	@JoinColumn()
	status: Status[];

	@OneToMany(() => EmailNotif, (email) => email.agency)
	@JoinColumn()
	email: EmailNotif[];

	@OneToMany(() => SmsNotif, (sms) => sms.agency)
	@JoinColumn()
	sms: SmsNotif[];

	@ManyToOne(() => Workgroup, (workgroup) => workgroup.agency)
	@JoinColumn()
	workgroup: Workgroup;
}
