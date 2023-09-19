import { Transaction } from './transaction-entity';

import { makeCard } from '@tests/factories/card';

describe('Transaction entity', (): void => {
	it('should create a Transaction', (): void => {
		const transaction = new Transaction({
			id: 'random_id',
			userId: 'random_user_id',
			value: '500.99',
			paymentMethod: 'debit_card',
			card: makeCard({
				ownerName: 'John Doe',
			}),
		});

		expect(transaction.id).toBe('random_id');
		expect(transaction.value).toBe('500.99');
		expect(transaction.cardOwnerName).toBe('John Doe');
		expect(transaction.createdAt).toBeTruthy();
	});
});
