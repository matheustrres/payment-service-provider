import {
	Column,
	CreateDateColumn,
	Entity,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

import { PgTransaction } from '@modules/transaction/domain/models/transaction-model';

@Entity('payables')
export class PgPayable {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar')
	transactionId: string;

	@OneToOne(() => PgTransaction, (transaction) => transaction.payable)
	transaction?: PgTransaction;

	@Column('varchar', { nullable: false })
	status: string;

	@Column('date')
	paymentDate: Date;

	@Column('decimal')
	fee: string;

	@CreateDateColumn({ default: 'now()' })
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt?: Date;
}
