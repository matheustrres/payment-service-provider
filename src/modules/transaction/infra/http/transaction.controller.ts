import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import {
	CreateTransactionDto,
	GetUserTransactionDto,
	ListUserTransactionsDto,
} from './dtos';
import {
	type TransactionToJSON,
	TransactionViewModel,
} from './transaction.view-model';

import { type ApiHttpResponse } from '@types';

import { CreateTransactionService } from '@modules/transaction/domain/services/create-transaction';
import { GetUserTransactionService } from '@modules/transaction/domain/services/get-user-transaction';
import { ListUserTransactionsService } from '@modules/transaction/domain/services/list-user-transactions';

@Controller('transactions')
export class TransactionController {
	public constructor(
		private readonly createTransactionService: CreateTransactionService,
		private readonly getUserTransactionService: GetUserTransactionService,
		private readonly listUserTransactionsService: ListUserTransactionsService,
	) {}

	@Post()
	public async createTransactionRoute(
		@Body() body: CreateTransactionDto,
		@Res() response: Response,
	): Promise<TransactionResponse> {
		const { transaction } = await this.createTransactionService.exec({
			...body,
			cardExpirationDate: new Date(body.cardExpirationDate),
		});

		return response.send({
			transaction: TransactionViewModel.toJSON(transaction),
		});
	}

	@Get(':userId/:transactionId')
	public async getUserTransactionRoute(
		@Param() params: GetUserTransactionDto,
		@Res() response: Response,
	): Promise<TransactionResponse> {
		const { transaction } = await this.getUserTransactionService.exec(params);

		return response.send({
			transaction: TransactionViewModel.toJSON(transaction, true),
		});
	}

	@Get(':userId')
	public async listUserTransactionsRoute(
		@Param() params: ListUserTransactionsDto,
		@Res() response: Response,
	): Promise<TransactionsResponse> {
		const { transactions } =
			await this.listUserTransactionsService.exec(params);

		const mappedTransactions: TransactionToJSON[] = transactions.map((t) =>
			TransactionViewModel.toJSON(t, true),
		);

		return response.send({
			transactions: mappedTransactions,
		});
	}
}

type TransactionResponse = ApiHttpResponse<TransactionToJSON>;
type TransactionsResponse = ApiHttpResponse<TransactionToJSON[]>;
