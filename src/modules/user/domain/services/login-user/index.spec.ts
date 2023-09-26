import { type MockProxy, mock } from 'jest-mock-extended';

import { type CompareStrings } from '@core/contracts/hashing';

import { type FindUserByEmailRepository } from '@modules/user/data/repositories';

import { makeUser } from '@tests/factories/user';

import { LoginUserService } from '.';

describe('LoginUser service', (): void => {
	let userRepository: MockProxy<FindUserByEmailRepository>;
	let hashService: MockProxy<CompareStrings>;
	let sut: LoginUserService;

	beforeAll((): void => {
		userRepository = mock();
		hashService = mock();

		userRepository.findUserByEmail
			.mockResolvedValueOnce(null)
			.mockResolvedValue(
				makeUser({
					id: 'random_user_id',
					email: 'john.doe@gmail.com',
					password: 'this_is_a_hashed_password_string',
				}),
			);

		hashService.compareStrings
			.mockResolvedValueOnce(false)
			.mockResolvedValueOnce(true);
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

	it('should throw if given password does not match user password', async (): Promise<void> => {
		await expect(
			sut.exec({
				email: 'john.doe@gmail.com',
				password: 'random_password',
			}),
		).rejects.toThrowError('Invalid credentials.');

		expect(userRepository.findUserByEmail).toHaveBeenNthCalledWith(
			2,
			'john.doe@gmail.com',
		);
		expect(hashService.compareStrings).toHaveBeenNthCalledWith(1, {
			plainText: 'random_password',
			hash: 'this_is_a_hashed_password_string',
		});
	});

	it('should return the user', async (): Promise<void> => {
		const { user } = await sut.exec({
			email: 'john.doe@gmail.com',
			password: 'this_is_a_hashed_password_string',
		});

		expect(userRepository.findUserByEmail).toHaveBeenNthCalledWith(
			3,
			'john.doe@gmail.com',
		);
		expect(hashService.compareStrings).toHaveBeenNthCalledWith(2, {
			plainText: 'this_is_a_hashed_password_string',
			hash: 'this_is_a_hashed_password_string',
		});

		expect(user.id).toBe('random_user_id');
		expect(user.email).toBe('john.doe@gmail.com');
	});
});
