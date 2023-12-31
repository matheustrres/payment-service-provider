import { type MockProxy, mock } from 'jest-mock-extended';

import { type EventEmitter } from '@core/contracts/event-emitter';

import { type CreateTransactionRepository } from '@modules/transaction/data/repositories/create-transaction-repository';

import { CreateTransactionService } from '.';

describe('CreateTransaction service', (): void => {
	let eventEmitter: MockProxy<EventEmitter>;
	let transactionRepository: MockProxy<CreateTransactionRepository>;
	let sut: CreateTransactionService;

	beforeAll((): void => {
		eventEmitter = mock();
		transactionRepository = mock();
	});

	beforeEach((): void => {
		sut = new CreateTransactionService(transactionRepository, eventEmitter);
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

	it('should create a new transaction', async (): Promise<void> => {
		const { transaction } = await sut.exec({
			userId: 'random_user_id',
			cardCVV: '812',
			cardExpirationDate: new Date(2027, 7),
			cardNumber: '5122669098750023',
			cardOwnerName: 'David Ortiz',
			paymentMethod: 'credit_card',
			value: '285.99',
		});

		expect(transactionRepository.create).toHaveBeenNthCalledWith(
			1,
			transaction,
		);
		expect(eventEmitter.emit).toHaveBeenCalledTimes(1);

		expect(transaction.id).toBeDefined();
		expect(transaction.cardCVV).toBeDefined();
		expect(transaction.cardNumber).toBe('0023');
		expect(transaction.paymentMethod).toBe('credit_card');
	});
});
