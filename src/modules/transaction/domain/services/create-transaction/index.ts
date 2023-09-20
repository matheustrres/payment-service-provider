import { Card } from '../../entities/card/card';
import { InvalidCardError } from '../../entities/card/invalid-card.error';
import { InvalidTransactionError } from '../../errors/invalid-transaction.error';

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

export class CreateTransactionService
	implements BaseService<CreateTransactionRequest, CreateTransactionResponse>
{
	public constructor(
		private readonly transactionRepository: CreateTransactionRepository,
	) {}

	public async exec(
		request: CreateTransactionRequest,
	): Promise<CreateTransactionResponse> {
		if (!Transaction.isValidPaymentMethod(request.paymentMethod)) {
			throw new InvalidTransactionError(
				'Invalid payment method provided! Acceptable methods: credit_card, debit_card.',
			);
		}

		if (!Card.validateCardNumberLength(request.cardNumber)) {
			throw new InvalidCardError('Card number must have 16 digits.');
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
