import {
	Body,
	Controller,
	Get,
	ParseUUIDPipe,
	Post,
	Query,
	Res,
} from '@nestjs/common';
import { Response } from 'express';

import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { TransactionViewModel } from './transaction.view-model';

import { CreateTransactionService } from '@modules/transaction/domain/services/create-transaction';
import { ListUserTransactionsService } from '@modules/transaction/domain/services/list-user-transactions';

@Controller('transactions')
export class TransactionController {
	public constructor(
		private readonly createTransactionService: CreateTransactionService,
		private readonly listUserTransactionsService: ListUserTransactionsService,
	) {}

	@Post()
	public async createTransactionRoute(
		@Body() body: CreateTransactionDto,
		@Res() response: Response,
	) {
		const { transaction } = await this.createTransactionService.exec(body);

		return response.send({
			transaction: TransactionViewModel.toJSON(transaction),
		});
	}

	@Get()
	public async listUserTransactionsRoute(
		@Query('user_id', new ParseUUIDPipe()) userId: string,
		@Res() response: Response,
	) {
		const { transactions } = await this.listUserTransactionsService.exec({
			userId,
		});

		return response.send({
			transactions: transactions.map(TransactionViewModel.toJSON),
		});
	}
}
