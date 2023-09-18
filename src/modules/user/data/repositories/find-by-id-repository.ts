import { type User } from '@modules/user/domain/entities/user-entity';

export abstract class FindUserByIdRepository {
	public abstract findUserById(userId: string): Promise<User | null>;
}
