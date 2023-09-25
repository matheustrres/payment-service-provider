import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	type Relation,
	UpdateDateColumn,
} from 'typeorm';

import { PgTransaction } from '@modules/transaction/infra/database/transaction-model';

@Entity('users')
export class PgUser {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar')
	name: string;

	@Column('varchar', {
		unique: true,
	})
	email: string;

	@Column('varchar')
	password: string;

	@OneToMany(() => PgTransaction, (transaction) => transaction.user)
	transactions: Relation<PgTransaction[]> | null;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt?: Date;
}