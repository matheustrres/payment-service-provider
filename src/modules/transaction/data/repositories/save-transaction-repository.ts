import { type Transaction } from '@modules/transaction/domain/entities/transaction-entity';

export abstract class SaveTransactionRepository {
	public abstract saveTransaction(transaction: Transaction): Promise<void>;
}
