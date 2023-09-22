import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
	Relation,
	UpdateDateColumn,
} from 'typeorm';

import { PgTransaction } from '@modules/transaction/infra/database/transaction-model';

@Entity('payables')
export class PgPayable {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', { nullable: false })
	transactionId: string;

	@OneToOne(() => PgTransaction, (transaction) => transaction.payable)
	@JoinColumn({ name: 'transactionId', referencedColumnName: 'id' })
	transaction?: Relation<PgTransaction>;

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
