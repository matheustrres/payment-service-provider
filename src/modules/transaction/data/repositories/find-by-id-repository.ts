import { type Transaction } from '@modules/transaction/domain/entities/transaction-entity';

export abstract class FindTransactionByIdRepository {
	public abstract findTransactionById(
		userId: string,
		transactionId: string,
	): Promise<Transaction | null>;
}
