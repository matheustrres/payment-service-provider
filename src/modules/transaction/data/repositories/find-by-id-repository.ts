import { type Transaction } from '@modules/transaction/domain/entities/transaction-entity';

type FindTransactionOptions = {
	userId: string;
	transactionId: string;
};

export abstract class FindTransactionByIdRepository {
	public abstract findTransactionById(
		options: FindTransactionOptions,
	): Promise<Transaction | null>;
}
