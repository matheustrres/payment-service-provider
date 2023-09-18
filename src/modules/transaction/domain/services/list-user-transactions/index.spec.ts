import { type MockProxy, mock } from 'jest-mock-extended';

import { type ListUserTransactionsRepository } from '@modules/transaction/data/repositories/list-user-transactions-repository';
import { type FindUserByIdRepository } from '@modules/user/data/repositories/find-by-id-repository';

import { ListUserTransactionsService } from '.';

describe('ListUserTransactions service', (): void => {
	let transactionRepository: MockProxy<ListUserTransactionsRepository>;
	let userRepository: MockProxy<FindUserByIdRepository>;
	let sut: ListUserTransactionsService;

	beforeAll((): void => {
		transactionRepository = mock();
		userRepository = mock();

		userRepository.findUserById.mockResolvedValueOnce(null);
	});

	beforeEach((): void => {
		sut = new ListUserTransactionsService(
			transactionRepository,
			userRepository,
		);
	});

	it('should throw if an invalid user tries to list transactions', async (): Promise<void> => {
		await expect(
			sut.exec({
				userId: 'fake_user_id',
			}),
		).rejects.toThrowError('No user found with ID "fake_user_id".');
	});
});
