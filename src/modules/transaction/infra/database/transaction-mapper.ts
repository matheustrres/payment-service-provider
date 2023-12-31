import { PgTransaction } from './transaction-model';

import { PayableMapper } from '@modules/payable/infra/database/payable-mapper';
import { Card } from '@modules/transaction/domain/entities/card/card';
import { Transaction } from '@modules/transaction/domain/entities/transaction-entity';
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
			payable?: boolean;
		},
	): Transaction {
		const { user, payable, ...moreRest } = rest;

		Card.validateCardNumberLength(cardNumber, cardNumber.length);

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

		if (payable && relations?.payable) {
			transaction.payable = PayableMapper.toDomain(payable);
		}

		return transaction;
	}

	public static toPersistence(
		domainTransaction: Transaction,
		relations?: {
			user?: boolean;
		},
	): PgTransaction {
		const { user: domainUser, ...rest } = domainTransaction;

		const pgTransaction = Object.assign(new PgTransaction(), rest);

		if (domainUser && relations?.user) {
			pgTransaction.user = UserMapper.toPersistence(domainUser);
		}

		return pgTransaction;
	}
}
