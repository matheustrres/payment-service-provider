import { makeTransaction } from './transaction';

import { type GetBaseProps } from '@core/helpers/get-base-props';

import {
	Payable,
	type PayableProps,
} from '@modules/payable/domain/entities/payable-entity';
import { calculateFee } from '@modules/transaction/domain/helpers/calc-fee';

export const makePayable = (
	override: Partial<GetBaseProps<PayableProps>> = {},
): Payable => {
	const transaction = makeTransaction();

	return new Payable({
		id: override.id ?? 'random_payable_id',
		transactionId: transaction.id,
		fee: calculateFee(transaction).toString(),
		paymentDate: new Date(),
		status: 'paid',
		...override,
	});
};
