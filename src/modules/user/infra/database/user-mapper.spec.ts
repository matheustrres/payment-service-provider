import { UserMapper } from './user-mapper';

import { User } from '@modules/user/domain/entities/user-entity';
import { PgUser } from '@modules/user/domain/models/user-model';

import { makeUser } from '@tests/factories/user';

describe('User mapper', (): void => {
	describe('.toDomain', (): void => {
		it('should convert PgUser to User', (): void => {
			const pgUser: PgUser = {
				id: 'random_pg_user_id',
				name: 'John Doe',
				email: 'john@doe.com',
				password: 'youshallnotpass',
				transactions: [],
				createdAt: new Date(),
			};

			const domainUser = UserMapper.toDomain(pgUser);

			expect(domainUser).toBeDefined();
			expect(domainUser).toBeInstanceOf(User);
			expect(domainUser.id).toEqual(pgUser.id);
			expect(domainUser.createdAt).toEqual(pgUser.createdAt);
		});
	});

	describe('.toPersistence', (): void => {
		it('should convert User to PgUser', (): void => {
			const domainUser = makeUser();

			const pgUser = UserMapper.toPersistence(domainUser);

			expect(pgUser).toBeDefined();
			expect(pgUser).toBeInstanceOf(PgUser);
			expect(pgUser.id).toEqual(domainUser.id);
			expect(pgUser.createdAt).toEqual(domainUser.createdAt);
		});
	});
});
