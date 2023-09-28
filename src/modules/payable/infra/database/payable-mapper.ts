import { PgPayable } from './payable-model';

import { Payable } from '@modules/payable/domain/entities/payable-entity';
import { TransactionMapper } from '@modules/transaction/infra/database/transaction-mapper';
import { UserMapper } from '@modules/user/infra/database/user-mapper';

export class PayableMapper {
	public static toDomain(
		pgPayable: PgPayable,
		relations?: {
			transaction?: boolean;
			user?: boolean;
		},
	): Payable {
		const { transaction, user, ...rest } = pgPayable;

		Payable.isValidStatus(pgPayable.status);

		const payable = new Payable(rest);

		if (transaction && relations?.transaction) {
			payable.transaction = TransactionMapper.toDomain(transaction);
		}

		if (user && relations?.user) {
			payable.user = UserMapper.toDomain(user);
		}

		return payable;
	}

	public static toPersistence(
		domainPayable: Payable,
		relations?: {
			transaction?: boolean;
			user?: boolean;
		},
	): PgPayable {
		const { transaction, user, ...rest } = domainPayable;

		const pgPayable = Object.assign(new PgPayable(), rest);

		if (transaction && relations?.transaction) {
			pgPayable.transaction = TransactionMapper.toPersistence(transaction);
		}

		if (user && relations?.user) {
			pgPayable.user = UserMapper.toPersistence(user);
		}

		return pgPayable;
	}
}
