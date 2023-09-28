import { PayableMapper } from '@modules/payable/infra/database/payable-mapper';
import { TransactionMapper } from '@modules/transaction/infra/database/transaction-mapper';
import { User } from '@modules/user/domain/entities/user-entity';
import { PgUser } from '@modules/user/infra/database/user-model';

export class UserMapper {
	public static toDomain(pgUser: PgUser): User {
		const payables =
			pgUser.payables?.map((p) => PayableMapper.toDomain(p)) ?? [];
		const transactions =
			pgUser.transactions?.map((t) => TransactionMapper.toDomain(t)) ?? [];

		return new User({
			...pgUser,
			payables,
			transactions,
		});
	}

	public static toPersistence(
		domainUser: User,
		relations?: {
			transactions?: boolean;
			payables?: boolean;
		},
	): PgUser {
		const { transactions, payables, ...rest } = domainUser;

		const user = Object.assign(new PgUser(), rest);

		if (transactions?.length && relations?.transactions) {
			user.transactions = transactions.map((t) =>
				TransactionMapper.toPersistence(t),
			);
		}

		if (payables?.length && relations?.payables) {
			user.payables = payables.map((p) => PayableMapper.toPersistence(p));
		}

		return user;
	}
}
