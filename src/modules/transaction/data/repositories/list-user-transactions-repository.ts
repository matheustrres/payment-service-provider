import { type Transaction } from '@modules/transaction/domain/entities/transaction-entity';

export abstract class ListUserTransactionsRepository {
	public abstract listUserTransactions(
		userId: string,
	): Promise<Transaction[] | null>;
}
