import { type Transaction } from '../../entities/transaction-entity';

import { type BaseService } from '@core/base-service';

import { type ListUserTransactionsRepository } from '@modules/transaction/data/repositories/list-user-transactions-repository';
import { type FindUserByIdRepository } from '@modules/user/data/repositories/find-by-id-repository';

export type ListUserTransactionsRequest = {
	userId: string;
};

export type ListUserTransactionsResponse = {
	transactions: Transaction[];
};

export class ListUserTransactionsService
	implements
		BaseService<ListUserTransactionsRequest, ListUserTransactionsResponse>
{
	public constructor(
		private readonly transactionRepository: ListUserTransactionsRepository,
		private readonly userRepository: FindUserByIdRepository,
	) {}

	public async exec(
		request: ListUserTransactionsRequest,
	): Promise<ListUserTransactionsResponse> {
		const user = await this.userRepository.findUserById(request.userId);

		if (!user) {
			throw new Error(`No user found with ID "${request.userId}".`);
		}

		const transactions = await this.transactionRepository.listUserTransactions(
			user.id,
		);

		return {
			transactions: transactions ?? [],
		};
	}
}
