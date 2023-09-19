import { Module } from '@nestjs/common';

import { CreateTransactionRepository } from './data/repositories/create-transaction-repository';
import { ListUserTransactionsRepository } from './data/repositories/list-user-transactions-repository';
import { CreateTransactionService } from './domain/services/create-transaction';
import { PgTransactionRepository } from './infra/database/transaction-repository';
import { TransactionController } from './infra/http/transaction.controller';

@Module({
	providers: [
		{
			provide: CreateTransactionRepository,
			useClass: PgTransactionRepository,
		},
		{
			provide: ListUserTransactionsRepository,
			useExisting: CreateTransactionRepository,
		},
		{
			provide: CreateTransactionService,
			useFactory: (transactionRepository: CreateTransactionRepository) =>
				new CreateTransactionService(transactionRepository),
			inject: [CreateTransactionRepository],
		},
	],
	controllers: [TransactionController],
	exports: [CreateTransactionRepository, ListUserTransactionsRepository],
})
export class TransactionModule {}
