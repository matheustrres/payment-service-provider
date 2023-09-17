import { Transaction } from './transaction-entity';

import { makeCard } from '@tests/factories/card';

describe('Transaction entity', (): void => {
	it('should create a Transaction', (): void => {
		const transaction = new Transaction(
			{
				userId: 'random_user_id',
				value: 500.99,
				paymentMethod: 'debit_card',
				card: makeCard({
					ownerName: 'John Doe',
				}),
			},
			'random_id',
		);

		expect(transaction.id).toBe('random_id');
		expect(transaction.value).toBe(500.99);
		expect(transaction.card.ownerName).toBe('John Doe');
		expect(transaction.createdAt).toBeTruthy();
	});
});
