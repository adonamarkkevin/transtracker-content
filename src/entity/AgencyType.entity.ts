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
import { Agency } from "./Agency.entity";

@Entity({ name: "agency_type" })
export class AgencyType extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	region: String;

	@Column()
	province: String;

	@Column()
	municipality: String;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@DeleteDateColumn()
	deleted_at: Date;

	@OneToOne(() => Agency, (agency) => agency.agency_type)
	agency: Agency;
}
