import { type Transaction } from '@modules/transaction/domain/entities/transaction-entity';

export abstract class CreateTransactionRepository {
	public abstract create(transaction: Transaction): Promise<void>;
}
