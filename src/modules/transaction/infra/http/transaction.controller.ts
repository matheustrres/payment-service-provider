import { Body, Controller, Post } from '@nestjs/common';

import { CreateTransactionDto } from './dtos/create-transaction.dto';
import {
	TransactionViewModel,
	type TransactionToHTTP,
} from './transaction.view-model';

import { CreateTransactionService } from '@modules/transaction/domain/services/create-transaction';

@Controller('transactions')
export class TransactionController {
	public constructor(
		private readonly createTransactionService: CreateTransactionService,
	) {}

	@Post()
	public async createTransactionRoute(
		@Body() body: CreateTransactionDto,
	): Promise<TransactionToHTTP> {
		const { transaction } = await this.createTransactionService.exec(body);

		return TransactionViewModel.toHTTP(transaction);
	}
}
