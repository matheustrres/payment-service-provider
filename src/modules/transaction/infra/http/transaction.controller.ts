import { Body, Controller, Post } from '@nestjs/common';

import { CreateTransactionDto } from './dtos/create-transaction.dto';

import { CreateTransactionService } from '@modules/transaction/domain/services/create-transaction';

@Controller('transactions')
export class TransactionController {
	public constructor(
		private readonly createTransactionService: CreateTransactionService,
	) {}

	@Post()
	public async createTransactionRoute(@Body() body: CreateTransactionDto) {
		return this.createTransactionService.exec(body);
	}
}
