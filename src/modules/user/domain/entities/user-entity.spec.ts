import { User } from './user-entity';

describe('User entity', (): void => {
	it('should create a User', (): void => {
		const user = new User(
			{
				name: 'John Doe',
				email: 'john.doe@gmail.com',
				password: 'youshallnotpass',
			},
			'random_id',
		);

		expect(user.id).toBe('random_id');
		expect(user.transactions?.length).toBe(0);
		expect(user.createdAt).toBeTruthy();
	});
});
