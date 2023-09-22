import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
	Relation,
	UpdateDateColumn,
} from 'typeorm';

import { PgPayable } from '@modules/payable/infra/database/payable-model';
import { PgUser } from '@modules/user/infra/database/user-model';

@Entity('transactions')
export class PgTransaction {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', { nullable: false })
	userId: string;

	@ManyToOne(() => PgUser, (user) => user.transactions)
	@JoinColumn({ name: 'userId', referencedColumnName: 'id' })
	user: Relation<PgUser>;

	@Column('varchar', { nullable: true })
	payableId?: string;

	@OneToOne(() => PgPayable, (payable) => payable.transaction, {
		cascade: true,
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'payableId', referencedColumnName: 'id' })
	payable?: Relation<PgPayable>;

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
