import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
} from "typeorm";

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
}
