import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	OneToOne,
} from "typeorm";
import { AgencyType } from "./AgencyType";

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
	agency_type: AgencyType;
}
