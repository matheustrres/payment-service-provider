import { type MockProxy, mock } from 'jest-mock-extended';

import { type FindTransactionByIdRepository } from '@modules/transaction/data/repositories';
import { type FindUserByIdRepository } from '@modules/user/data/repositories';

import { makeTransaction } from '@tests/factories/transaction';
import { makeUser } from '@tests/factories/user';

import { GetUserTransactionService } from '.';

describe('GetUserTransaction service', (): void => {
	let userRepository: MockProxy<FindUserByIdRepository>;
	let transactionRepository: MockProxy<FindTransactionByIdRepository>;
	let sut: GetUserTransactionService;

	beforeAll((): void => {
		userRepository = mock();
		transactionRepository = mock();

		userRepository.findUserById
			.mockResolvedValueOnce(null)
			.mockResolvedValue(makeUser({ id: 'random_user_id' }));

		transactionRepository.findTransactionById
			.mockResolvedValueOnce(null)
			.mockResolvedValueOnce(
				makeTransaction({
					id: 'random_transaction_id',
				}),
			);
	});

	beforeEach((): void => {
		sut = new GetUserTransactionService(userRepository, transactionRepository);
	});

	it('should throw when searching for a transaction being an invalid user', async (): Promise<void> => {
		const promise = sut.exec({
			transactionId: 'alt_transaction_id',
			userId: 'fake_user_id',
		});

		await expect(promise).rejects.toThrowError(
			'No user were found with ID "fake_user_id".',
		);

		expect(userRepository.findUserById).toHaveBeenNthCalledWith(
			1,
			'fake_user_id',
		);
		expect(transactionRepository.findTransactionById).not.toHaveBeenCalled();
	});

	it('should throw when searching for an invalid transaction', async (): Promise<void> => {
		const promise = sut.exec({
			transactionId: 'fake_transaction_id',
			userId: 'random_user_id',
		});

		await expect(promise).rejects.toThrowError(
			'No transaction were found with ID "fake_transaction_id".',
		);

		expect(userRepository.findUserById).toHaveBeenNthCalledWith(
			2,
			'random_user_id',
		);
		expect(transactionRepository.findTransactionById).toHaveBeenNthCalledWith(
			1,
			{
				userId: 'random_user_id',
				transactionId: 'fake_transaction_id',
			},
		);
	});

	it('should get a user transaction by its id', async (): Promise<void> => {
		const { transaction } = await sut.exec({
			transactionId: 'random_transaction_id',
			userId: 'random_user_id',
		});

		expect(userRepository.findUserById).toHaveBeenNthCalledWith(
			3,
			'random_user_id',
		);
		expect(transactionRepository.findTransactionById).toHaveBeenNthCalledWith(
			2,
			{
				userId: 'random_user_id',
				transactionId: 'random_transaction_id',
			},
		);

		expect(transaction.id).toBe('random_transaction_id');
	});
});
