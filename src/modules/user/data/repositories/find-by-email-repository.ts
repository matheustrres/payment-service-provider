import { type User } from '@modules/user/domain/entities/user-entity';

export abstract class FindUserByEmailRepository {
	public abstract findUserByEmail(email: string): Promise<User | null>;
}
