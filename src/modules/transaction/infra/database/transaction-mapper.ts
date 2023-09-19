import { Card } from '@modules/transaction/domain/entities/card/card';
import { Transaction } from '@modules/transaction/domain/entities/transaction-entity';
import { type PgTransaction } from '@modules/transaction/domain/models/transaction-model';
import { UserMapper } from '@modules/user/infra/database/user-mapper';

export class TransactionMapper {
	public static toDomain(
		{
			cardCVV,
			cardExpirationDate,
			cardNumber,
			cardOwnerName,
			...rest
		}: PgTransaction,
		relations?: {
			user?: boolean;
		},
	): Transaction {
		const { user, ...moreRest } = rest;

		const transaction = new Transaction({
			card: new Card({
				CVV: cardCVV,
				expirationDate: cardExpirationDate,
				number: cardNumber,
				ownerName: cardOwnerName,
			}),
			...moreRest,
		});

		if (user && relations?.user) {
			transaction.user = UserMapper.toDomain(user);
		}

		return transaction;
	}

	public static toPersistence(
		domainTransactions: Transaction,
		relations?: {
			user?: boolean;
		},
	) {
		const { user: domainUser, ...rest } = domainTransactions;

		const pgTransaction = rest as PgTransaction;

		if (domainUser && relations?.user) {
			pgTransaction.user = UserMapper.toPersistence(domainUser);
		}

		return pgTransaction;
	}
}
