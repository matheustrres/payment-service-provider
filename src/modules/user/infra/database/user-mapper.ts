import { TransactionMapper } from '@modules/transaction/infra/database/transaction-mapper';
import { User } from '@modules/user/domain/entities/user-entity';
import { type PgUser } from '@modules/user/domain/models/user-model';

export class UserMapper {
	public static toDomain(pgUser: PgUser): User {
		return new User({
			...pgUser,
			transactions: [],
		});
	}

	public static toPersistence(
		domainUser: User,
		relations?: {
			transactions?: boolean;
		},
	): PgUser {
		const { transactions: domainTransactions, ...rest } = domainUser;

		const user = rest as PgUser;

		if (domainTransactions?.length && relations?.transactions) {
			user.transactions = domainTransactions.map((domainTransaction) =>
				TransactionMapper.toPersistence(domainTransaction),
			);
		}

		return user;
	}
}
