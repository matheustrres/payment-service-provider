import { type MockProxy, mock } from 'jest-mock-extended';

import { type CompareStrings } from '@core/contracts/hashing';

import { type FindUserByEmailRepository } from '@modules/user/data/repositories';

import { LoginUserService } from '.';

describe('LoginUser service', (): void => {
	let userRepository: MockProxy<FindUserByEmailRepository>;
	let hashService: MockProxy<CompareStrings>;
	let sut: LoginUserService;

	beforeAll((): void => {
		userRepository = mock();
		hashService = mock();

		userRepository.findUserByEmail.mockResolvedValueOnce(null);
	});

	beforeEach((): void => {
		sut = new LoginUserService(userRepository, hashService);
	});

	it('should throw if an invalid user tries to login', async (): Promise<void> => {
		await expect(
			sut.exec({
				email: 'fake_email@gmail.com',
				password: 'random_password',
			}),
		).rejects.toThrowError('Invalid credentials.');

		expect(userRepository.findUserByEmail).toHaveBeenNthCalledWith(
			1,
			'fake_email@gmail.com',
		);
		expect(hashService.compareStrings).not.toHaveBeenCalled();
	});
});
