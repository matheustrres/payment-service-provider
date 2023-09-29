import {
	Body,
	Controller,
	Get,
	Param,
	ParseUUIDPipe,
	Post,
	UseGuards,
} from '@nestjs/common';

import { CreateTransactionDto } from './dtos';
import {
	type TransactionToJSON,
	TransactionViewModel,
} from './transaction.view-model';

import { LoggedInUser } from '@infra/http/authentication/decorators/logged-user.decorator';
import { JwtAuthGuard } from '@infra/http/authentication/guards/jwt-auth.guard';

import { CreateTransactionService } from '@modules/transaction/domain/services/create-transaction';
import { GetUserTransactionService } from '@modules/transaction/domain/services/get-user-transaction';
import { ListUserTransactionsService } from '@modules/transaction/domain/services/list-user-transactions';
import { User } from '@modules/user/domain/entities/user-entity';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionController {
	public constructor(
		private readonly createTransactionService: CreateTransactionService,
		private readonly getUserTransactionService: GetUserTransactionService,
		private readonly listUserTransactionsService: ListUserTransactionsService,
	) {}

	@Post()
	public async createTransactionRoute(
		@LoggedInUser() user: User,
		@Body() body: CreateTransactionDto,
	): Promise<TransactionToJSON> {
		const { transaction } = await this.createTransactionService.exec({
			...body,
			userId: user.id,
			cardExpirationDate: new Date(body.cardExpirationDate),
		});

		return TransactionViewModel.toJSON(transaction);
	}

	@Get(':transactionId')
	public async getUserTransactionRoute(
		@Param('transactionId', new ParseUUIDPipe()) transactionId: string,
		@LoggedInUser() user: User,
	): Promise<TransactionToJSON> {
		const { transaction } = await this.getUserTransactionService.exec({
			transactionId,
			userId: user.id,
		});

		return TransactionViewModel.toJSON(transaction, true);
	}

	@Get()
	public async listUserTransactionsRoute(
		@LoggedInUser() user: User,
	): Promise<TransactionToJSON[]> {
		const { transactions } = await this.listUserTransactionsService.exec({
			userId: user.id,
		});

		const mappedTransactions: TransactionToJSON[] = transactions.map((t) =>
			TransactionViewModel.toJSON(t, true),
		);

		return mappedTransactions;
	}
}
