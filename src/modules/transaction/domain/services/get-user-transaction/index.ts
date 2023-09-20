import { type Transaction } from '../../entities/transaction-entity';
import { InvalidTransactionError } from '../../errors/invalid-transaction.error';

import { type BaseService } from '@core/base-service';

import { type FindTransactionByIdRepository } from '@modules/transaction/data/repositories';

export type GetUserTransactionRequest = {
	userId: string;
	transactionId: string;
};

export type GetUserTransactionResponse = {
	transaction: Transaction;
};

export class GetUserTransactionService
	implements BaseService<GetUserTransactionRequest, GetUserTransactionResponse>
{
	public constructor(
		private readonly transactionRepository: FindTransactionByIdRepository,
	) {}

	public async exec(
		request: GetUserTransactionRequest,
	): Promise<GetUserTransactionResponse> {
		const transaction = await this.transactionRepository.findTransactionById(
			request.userId,
			request.transactionId,
		);

		if (!transaction) {
			throw new InvalidTransactionError(
				`No transaction were found with ID "${request.transactionId}"`,
			);
		}

		return {
			transaction,
		};
	}
}
