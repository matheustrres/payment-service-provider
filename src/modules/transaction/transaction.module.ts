import { Module } from '@nestjs/common';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';

import {
	FindTransactionByIdRepository,
	SaveTransactionRepository,
} from './data/repositories';
import { CreateTransactionRepository } from './data/repositories/create-transaction-repository';
import { ListUserTransactionsRepository } from './data/repositories/list-user-transactions-repository';
import { CreateTransactionService } from './domain/services/create-transaction';
import { GetUserTransactionService } from './domain/services/get-user-transaction';
import { ListUserTransactionsService } from './domain/services/list-user-transactions';
import { PgTransactionRepository } from './infra/database/transaction-repository';
import { TransactionController } from './infra/http/transaction.controller';
import { TransactionCreatedEventListener } from './infra/listeners/transaction-created.listener';

import { EventEmitter } from '@core/contracts/event-emitter';

import { CreatePayableRepository } from '@modules/payable/data/repositories';
import { PayableModule } from '@modules/payable/payable.module';
import { FindUserByIdRepository } from '@modules/user/data/repositories';
import { UserModule } from '@modules/user/user.module';

type ListUserTransactionsServiceTransactionRepository =
	ListUserTransactionsRepository;
type ListUserTransactionsServiceUserRepository = FindUserByIdRepository;

type GetUserTransactionServiceUserRespository = FindUserByIdRepository;
type GetUserTransactionServiceTransactionRepository =
	FindTransactionByIdRepository;

type TransactionCreatedEventListenerTransactionRepository =
	FindTransactionByIdRepository & SaveTransactionRepository;

@Module({
	imports: [
		EventEmitterModule.forRoot({
			delimiter: '.',
			global: true,
			ignoreErrors: false,
			maxListeners: 10,
			newListener: false,
			wildcard: false,
		}),
		UserModule,
		PayableModule,
	],
	providers: [
		{
			provide: EventEmitter,
			useExisting: EventEmitter2,
		},
		{
			provide: CreateTransactionRepository,
			useClass: PgTransactionRepository,
		},
		{
			provide: ListUserTransactionsRepository,
			useExisting: CreateTransactionRepository,
		},
		{
			provide: FindTransactionByIdRepository,
			useExisting: CreateTransactionRepository,
		},
		{
			provide: SaveTransactionRepository,
			useExisting: CreateTransactionRepository,
		},
		{
			provide: CreateTransactionService,
			useFactory: (
				transactionRepository: CreateTransactionRepository,
				eventEmitter: EventEmitter,
			) => new CreateTransactionService(transactionRepository, eventEmitter),
			inject: [CreateTransactionRepository, EventEmitter],
		},
		{
			provide: GetUserTransactionService,
			useFactory: (
				userRepository: GetUserTransactionServiceUserRespository,
				transactionRepository: GetUserTransactionServiceTransactionRepository,
			) => new GetUserTransactionService(userRepository, transactionRepository),
			inject: [FindUserByIdRepository, FindTransactionByIdRepository],
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
		{
			provide: TransactionCreatedEventListener,
			useFactory: (
				payableRepository: CreatePayableRepository,
				transactionRepository: TransactionCreatedEventListenerTransactionRepository,
			) =>
				new TransactionCreatedEventListener(
					payableRepository,
					transactionRepository,
				),
			inject: [
				CreatePayableRepository,
				FindTransactionByIdRepository,
				SaveTransactionRepository,
			],
		},
	],
	controllers: [TransactionController],
	exports: [
		CreateTransactionRepository,
		ListUserTransactionsRepository,
		SaveTransactionRepository,
		EventEmitter,
	],
})
export class TransactionModule {}
