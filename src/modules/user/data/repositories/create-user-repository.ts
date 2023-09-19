import { type User } from '@modules/user/domain/entities/user-entity';

export abstract class CreateUserRepository {
	public abstract create(user: User): Promise<void>;
}
