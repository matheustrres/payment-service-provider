import { Card } from '../../entities/card/card';

import { type BaseService } from '@core/base-service';

import { type CreateTransactionRepository } from '@modules/transaction/data/repositories/create-transaction-repository';
import { Transaction } from '@modules/transaction/domain/entities/transaction-entity';

export type CreateTransactionRequest = {
	value: string;
	description?: string;
	paymentMethod: string; // credit_card | debit_card
	cardNumber: string;
	cardOwnerName: string;
	cardExpirationDate: Date;
	cardCVV: string;
	userId: string;
};

export type CreateTransactionResponse = {
	transaction: Transaction;
};

const validPaymentMethods: string[] = ['credit_card', 'debit_card'];

export class CreateTransactionService
	implements BaseService<CreateTransactionRequest, CreateTransactionResponse>
{
	public constructor(
		private readonly transactionRepository: CreateTransactionRepository,
	) {}

	public async exec(
		request: CreateTransactionRequest,
	): Promise<CreateTransactionResponse> {
		if (!validPaymentMethods.includes(request.paymentMethod)) {
			throw new Error(
				'Invalid payment method provided! Acceptable methods: credit_card, debit_card.',
			);
		}

		const transaction = new Transaction({
			...request,
			card: new Card({
				CVV: request.cardCVV,
				expirationDate: request.cardExpirationDate,
				number: request.cardNumber,
				ownerName: request.cardOwnerName,
			}),
		});

		await this.transactionRepository.create(transaction);

		return {
			transaction,
		};
	}
}
