import { Module } from '@nestjs/common';

import { CreateTransactionRepository } from './data/repositories/create-transaction-repository';
import { ListUserTransactionsRepository } from './data/repositories/list-user-transactions-repository';
import { CreateTransactionService } from './domain/services/create-transaction';
import { ListUserTransactionsService } from './domain/services/list-user-transactions';
import { PgTransactionRepository } from './infra/database/transaction-repository';
import { TransactionController } from './infra/http/transaction.controller';

import { FindUserByIdRepository } from '@modules/user/data/repositories';
import { UserModule } from '@modules/user/user.module';

type ListUserTransactionsServiceTransactionRepository =
	ListUserTransactionsRepository;
type ListUserTransactionsServiceUserRepository = FindUserByIdRepository;

@Module({
	imports: [UserModule],
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
		{
			provide: ListUserTransactionsService,
			useFactory: (
				transactionRepository: ListUserTransactionsServiceTransactionRepository,
				userRepository: ListUserTransactionsServiceUserRepository,
			) =>
				new ListUserTransactionsService(transactionRepository, userRepository),
			inject: [ListUserTransactionsRepository, FindUserByIdRepository],
		},
	],
	controllers: [TransactionController],
	exports: [CreateTransactionRepository, ListUserTransactionsRepository],
})
export class TransactionModule {}
