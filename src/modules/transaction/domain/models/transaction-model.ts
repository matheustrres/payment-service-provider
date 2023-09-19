import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

import { PgUser } from '@modules/user/domain/models/user-model';

@Entity('transactions')
export class PgTransaction {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', { nullable: false })
	userId: string;

	@ManyToOne(() => PgUser, (user) => user.transactions)
	@JoinColumn({ name: 'userId', referencedColumnName: 'id' })
	user: PgUser;

	@Column('varchar', { nullable: true })
	payableId?: string;

	@Column('decimal')
	value: string;

	@Column('varchar')
	paymentMethod: string; // debit_card | credit_card

	@Column('varchar', {
		nullable: true,
	})
	description?: string;

	@Column('varchar', {
		length: 3,
	})
	cardCVV: string;

	@Column('date')
	cardExpirationDate: Date;

	@Column('varchar')
	cardOwnerName: string;

	@Column('varchar', {
		length: 4,
	})
	cardNumber: string;

	@CreateDateColumn({ default: 'now()' })
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt?: Date;
}
