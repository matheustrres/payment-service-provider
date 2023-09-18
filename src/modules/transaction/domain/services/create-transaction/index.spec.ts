import { type MockProxy, mock } from 'jest-mock-extended';

import { type CreateTransactionRepository } from '@modules/transaction/data/repositories/create-transaction-repository';

import { CreateTransactionService } from '.';

describe('CreateTransaction service', (): void => {
	let transactionRepository: MockProxy<CreateTransactionRepository>;
	let sut: CreateTransactionService;

	beforeAll((): void => {
		transactionRepository = mock();
	});

	beforeEach((): void => {
		sut = new CreateTransactionService(transactionRepository);
	});

	it('should throw if payment method is not valid', async (): Promise<void> => {
		await expect(
			sut.exec({
				userId: 'random_user_id',
				cardCVV: '123',
				cardExpirationDate: new Date(2023, 10, 1),
				cardNumber: 'random_card_number',
				cardOwnerName: 'random_card_owner_name',
				paymentMethod: 'fake_payment_method',
				value: '300',
			}),
		).rejects.toThrowError(
			'Invalid payment method provided! Acceptable methods: credit_card, debit_card.',
		);
	});
});
