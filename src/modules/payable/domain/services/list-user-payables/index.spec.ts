import { type MockProxy, mock } from 'jest-mock-extended';

import { type ListUserPayablesRepository } from '@modules/payable/data/repositories';
import { type FindUserByIdRepository } from '@modules/user/data/repositories';

import { makeUser } from '@tests/factories/user';

import { ListUserPayablesService } from '.';

describe('ListUserPayables service', (): void => {
	let payableRepository: MockProxy<ListUserPayablesRepository>;
	let userRepository: MockProxy<FindUserByIdRepository>;
	let sut: ListUserPayablesService;

	beforeAll((): void => {
		payableRepository = mock();
		userRepository = mock();

		userRepository.findUserById.mockResolvedValueOnce(null);
		userRepository.findUserById.mockResolvedValue(
			makeUser({
				id: 'random_user_id',
			}),
		);

		payableRepository.listUserPayables.mockResolvedValueOnce(null);
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

		expect(userRepository.findUserById).toHaveBeenNthCalledWith(
			1,
			'fake_user_id',
		);
		expect(payableRepository.listUserPayables).not.toHaveBeenCalled();
	});

	it('should throw if user has no payables', async (): Promise<void> => {
		await expect(
			sut.exec({
				userId: 'random_user_id',
			}),
		).rejects.toThrowError('No payables were found.');

		expect(userRepository.findUserById).toHaveBeenNthCalledWith(
			2,
			'random_user_id',
		);
		expect(payableRepository.listUserPayables).toHaveBeenCalledTimes(1);
	});
});
