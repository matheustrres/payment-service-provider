import { UserMapper } from './user-mapper';

import { User } from '@modules/user/domain/entities/user-entity';
import { type PgUser } from '@modules/user/domain/models/user-model';

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
});
