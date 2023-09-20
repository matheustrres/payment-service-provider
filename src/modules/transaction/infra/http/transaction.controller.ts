import {
	Body,
	Controller,
	Get,
	Param,
	ParseUUIDPipe,
	Post,
	Query,
	Res,
} from '@nestjs/common';
import { Response } from 'express';

import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { TransactionViewModel } from './transaction.view-model';

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
	): Promise<Response> {
		const { transaction } = await this.createTransactionService.exec(body);

		return response.send({
			transaction: TransactionViewModel.toJSON(transaction),
		});
	}

	@Get(':user_id/:transaction_id')
	public async getUserTransactionRoute(
		@Param('user_id', new ParseUUIDPipe()) userId: string,
		@Param('transaction_id', new ParseUUIDPipe()) transactionId: string,
		@Res() response: Response,
	): Promise<Response> {
		const { transaction } = await this.getUserTransactionService.exec({
			transactionId,
			userId,
		});

		return response.send({
			transaction: TransactionViewModel.toJSON(transaction),
		});
	}

	@Get()
	public async listUserTransactionsRoute(
		@Query('user_id', new ParseUUIDPipe()) userId: string,
		@Res() response: Response,
	): Promise<Response> {
		const { transactions } = await this.listUserTransactionsService.exec({
			userId,
		});

		return response.send({
			transactions: transactions.map(TransactionViewModel.toJSON),
		});
	}
}
