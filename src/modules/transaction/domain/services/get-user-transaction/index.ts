import { type Transaction } from '../../entities/transaction-entity';
import { InvalidTransactionError } from '../../errors/invalid-transaction.error';

import { type BaseService } from '@core/base-service';

import { type FindTransactionByIdRepository } from '@modules/transaction/data/repositories';
import { type FindUserByIdRepository } from '@modules/user/data/repositories';

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
		private readonly userRepository: FindUserByIdRepository,
		private readonly transactionRepository: FindTransactionByIdRepository,
	) {}

	public async exec({
		transactionId,
		userId,
	}: GetUserTransactionRequest): Promise<GetUserTransactionResponse> {
		const user = await this.userRepository.findUserById(userId);

		if (!user) {
			throw new InvalidTransactionError(
				`No user were found with ID "${userId}".`,
			);
		}

		const transaction = await this.transactionRepository.findTransactionById({
			transactionId,
			userId,
		});

		if (!transaction) {
			throw new InvalidTransactionError(
				`No transaction were found with ID "${transactionId}".`,
			);
		}

		return {
			transaction,
		};
	}
}
