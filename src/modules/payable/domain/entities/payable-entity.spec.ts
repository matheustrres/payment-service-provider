import { Payable } from './payable-entity';

import { calculateFee } from '@modules/transaction/domain/helpers/calc-fee';

import { makeTransaction } from '@tests/factories/transaction';

describe('Payable entity', (): void => {
	it('should create a Payable', (): void => {
		const transaction = makeTransaction();

		const payable = new Payable({
			id: 'random_payable_id',
			fee: calculateFee(transaction).toString(),
			paymentDate: new Date(2023, 9, 21),
			status: 'paid',
			transactionId: transaction.id,
		});

		expect(payable.id).toBe('random_payable_id');
		expect(payable.status).toBe('paid');
		expect(payable.fee).toBe('485');
	});
});
