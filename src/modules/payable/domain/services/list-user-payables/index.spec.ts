import { type MockProxy, mock } from 'jest-mock-extended';

import { type ListUserPayablesRepository } from '@modules/payable/data/repositories';
import { type FindUserByIdRepository } from '@modules/user/data/repositories';

import { ListUserPayablesService } from '.';

describe('ListUserPayables service', (): void => {
	let payableRepository: MockProxy<ListUserPayablesRepository>;
	let userRepository: MockProxy<FindUserByIdRepository>;
	let sut: ListUserPayablesService;

	beforeAll((): void => {
		payableRepository = mock();
		userRepository = mock();

		userRepository.findUserById.mockResolvedValueOnce(null);
	});

	beforeEach((): void => {
		sut = new ListUserPayablesService(payableRepository, userRepository);
	});

	it('should throw if no user were found with given ID', async (): Promise<void> => {
		await expect(
			sut.exec({
				userId: 'fake_user_id',
			}),
		).rejects.toThrowError('No user were found with ID "fake_user_id".');
	});
});
