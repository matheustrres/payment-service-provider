import { type MockProxy, mock } from 'jest-mock-extended';

import { type FindTransactionByIdRepository } from '@modules/transaction/data/repositories';
import { type FindUserByIdRepository } from '@modules/user/data/repositories';

import { GetUserTransactionService } from '.';

describe('GetUserTransaction service', (): void => {
	let userRepository: MockProxy<FindUserByIdRepository>;
	let transactionRepository: MockProxy<FindTransactionByIdRepository>;
	let sut: GetUserTransactionService;

	beforeAll((): void => {
		userRepository = mock();
		transactionRepository = mock();

		userRepository.findUserById.mockResolvedValueOnce(null);
	});

	beforeEach((): void => {
		sut = new GetUserTransactionService(userRepository, transactionRepository);
	});

	it('should thrown when trying to find a transaction being an invalid user', async (): Promise<void> => {
		const promise = sut.exec({
			transactionId: 'random_transaction_id',
			userId: 'fake_user_id',
		});

		await expect(promise).rejects.toThrowError(
			'No user were found with ID "fake_user_id".',
		);

		expect(userRepository.findUserById).toHaveBeenNthCalledWith(
			1,
			'fake_user_id',
		);
	});
});
