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

		userRepository.findUserByEmail.mockResolvedValueOnce(
			makeUser({
				email: 'john@example.com',
			}),
		);
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
	});
});
