import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Agency } from "./Agency.entity";

@Entity({ name: "workgroups" })
export class Workgroup extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: String;

	@OneToMany(() => Agency, (agency) => agency.workgroup)
	agency: Agency[];
}
