import { type MockProxy, mock } from 'jest-mock-extended';

import { type ListUserTransactionsRepository } from '@modules/transaction/data/repositories/list-user-transactions-repository';
import { type FindUserByIdRepository } from '@modules/user/data/repositories/find-by-id-repository';

import { makeTransaction } from '@tests/factories/transaction';
import { makeUser } from '@tests/factories/user';

import { ListUserTransactionsService } from '.';

describe('ListUserTransactions service', (): void => {
	let transactionRepository: MockProxy<ListUserTransactionsRepository>;
	let userRepository: MockProxy<FindUserByIdRepository>;
	let sut: ListUserTransactionsService;

	beforeAll((): void => {
		transactionRepository = mock();
		userRepository = mock();

		userRepository.findUserById
			.mockResolvedValueOnce(null)
			.mockResolvedValue(makeUser({}, 'random_user_id'));

		transactionRepository.listUserTransactions
			.mockResolvedValueOnce([])
			.mockResolvedValueOnce([
				makeTransaction(),
				makeTransaction(),
				makeTransaction(),
				makeTransaction(),
			]);
	});

	beforeEach((): void => {
		sut = new ListUserTransactionsService(
			transactionRepository,
			userRepository,
		);
	});

	it('should throw if an invalid user tries to list transactions', async (): Promise<void> => {
		const promise = sut.exec({
			userId: 'fake_user_id',
		});

		expect(userRepository.findUserById).toHaveBeenNthCalledWith(
			1,
			'fake_user_id',
		);

		await expect(promise).rejects.toThrowError(
			'No user found with ID "fake_user_id".',
		);
	});

	it('should return an empty array of user transactions', async (): Promise<void> => {
		const { transactions } = await sut.exec({ userId: 'random_user_id' });

		expect(userRepository.findUserById).toHaveBeenNthCalledWith(
			2,
			'random_user_id',
		);

		expect(transactions.length).toBe(0);
	});

	it('should return all user transactions', async (): Promise<void> => {
		const { transactions } = await sut.exec({ userId: 'random_user_id' });

		expect(userRepository.findUserById).toHaveBeenNthCalledWith(
			3,
			'random_user_id',
		);
		expect(transactionRepository.listUserTransactions).toHaveBeenNthCalledWith(
			1,
			'random_user_id',
		);

		expect(transactions.length).toBe(4);
	});
});
