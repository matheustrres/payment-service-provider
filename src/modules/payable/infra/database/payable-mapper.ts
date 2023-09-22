import { Payable } from '@modules/payable/domain/entities/payable-entity';
import { PgPayable } from '@modules/payable/domain/models/payable-model';
import { TransactionMapper } from '@modules/transaction/infra/database/transaction-mapper';

export class PayableMapper {
	public static toDomain(
		pgPayable: PgPayable,
		relations?: {
			transaction?: boolean;
		},
	): Payable {
		const { transaction, ...rest } = pgPayable;

		Payable.isValidStatus(pgPayable.status);

		const payable = new Payable(rest);

		if (transaction && relations?.transaction) {
			payable.transaction = TransactionMapper.toDomain(transaction);
		}

		return payable;
	}

	public static toPersistence(
		domainPayable: Payable,
		relations?: {
			transaction?: boolean;
		},
	): PgPayable {
		const { transaction: domainTransaction, ...rest } = domainPayable;

		const pgPayable = Object.assign(new PgPayable(), rest);

		if (domainTransaction && relations?.transaction) {
			pgPayable.transaction =
				TransactionMapper.toPersistence(domainTransaction);
		}

		return pgPayable;
	}
}
