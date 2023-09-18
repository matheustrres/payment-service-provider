import { makeCard } from './card';

import {
	Transaction,
	type TransactionProps,
} from '@modules/transaction/domain/entities/transaction-entity';

export const makeTransaction = (
	override: Partial<TransactionProps> = {},
	id?: string,
): Transaction =>
	new Transaction(
		{
			userId: 'random_user_id',
			paymentMethod: 'debit_card',
			card: makeCard(),
			value: '500.99',
			...override,
		},
		id,
	);
