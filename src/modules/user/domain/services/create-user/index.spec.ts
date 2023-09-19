import { type MockProxy, mock } from 'jest-mock-extended';

import {
	type CreateUserRepository,
	type FindUserByEmailRepository,
} from '@modules/user/data/repositories';

import { makeUser } from '@tests/factories/user';

import { CreateUserService } from '.';

describe('CreateUser service', (): void => {
	let userRepository: MockProxy<
		CreateUserRepository & FindUserByEmailRepository
	>;
	let sut: CreateUserService;

	beforeAll((): void => {
		userRepository = mock();

		userRepository.findUserByEmail
			.mockResolvedValueOnce(
				makeUser({
					email: 'john@example.com',
				}),
			)
			.mockResolvedValueOnce(null);
	});

	beforeEach((): void => {
		sut = new CreateUserService(userRepository);
	});

	it('should throw when trying to create a user with an already taken email', async (): Promise<void> => {
		await expect(
			sut.exec({
				name: 'John Doe',
				email: 'john@example.com',
				password: 'youshallnotpass',
			}),
		).rejects.toThrowError(
			'The email "john@example.com" is already being used.',
		);

		expect(userRepository.findUserByEmail).toHaveBeenNthCalledWith(
			1,
			'john@example.com',
		);
	});

	it('should create a new user', async (): Promise<void> => {
		const { user } = await sut.exec({
			name: 'Adam Smith',
			email: 'adam.smith@live.com',
			password: '*97&CaDF#4%',
		});

		expect(userRepository.findUserByEmail).toHaveBeenNthCalledWith(
			2,
			'adam.smith@live.com',
		);
		expect(userRepository.create).toHaveBeenNthCalledWith(1, user);

		expect(user.id).toBeDefined();
		expect(user.email).toBe('adam.smith@live.com');
		expect(user.transactions?.length).toBe(0);
	});
});
