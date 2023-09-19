import { makeCard } from './card';

import { type GetBaseProps } from '@core/helpers/get-base-props';

import {
	Transaction,
	type TransactionProps,
} from '@modules/transaction/domain/entities/transaction-entity';

export const makeTransaction = (
	override: Partial<GetBaseProps<TransactionProps>> = {},
): Transaction =>
	new Transaction({
		id: override.id ?? 'random_id',
		userId: 'random_user_id',
		paymentMethod: 'debit_card',
		card: makeCard(),
		value: '500.99',
		...override,
	});
