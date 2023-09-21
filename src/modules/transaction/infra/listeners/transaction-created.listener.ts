import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { TRANSACTION_CREATED_EVENT } from '@core/constants/events';
import { ServerError } from '@core/errors/server-error';

import { CreatePayableRepository } from '@modules/payable/data/repositories';
import { Payable } from '@modules/payable/domain/entities/payable-entity';
import {
	type FindTransactionByIdRepository,
	type SaveTransactionRepository,
} from '@modules/transaction/data/repositories';
import { type Transaction } from '@modules/transaction/domain/entities/transaction-entity';
import { InvalidTransactionError } from '@modules/transaction/domain/errors/invalid-transaction.error';
import { TransactionCreatedEvent } from '@modules/transaction/domain/events/transaction-created.event';
import { calculateFee } from '@modules/transaction/domain/helpers/calc-fee';

type TransactionRepository = FindTransactionByIdRepository &
	SaveTransactionRepository;

@Injectable()
export class TransactionCreatedEventListener {
	public constructor(
		private readonly payableRepository: CreatePayableRepository,
		private readonly transactionRepository: TransactionRepository,
	) {}

	/**
	 * Event triggered when a transaction is created and will be responsible for
	 * creating a payable for this transaction
	 */
	@OnEvent(TRANSACTION_CREATED_EVENT)
	public async processCreatedTransaction(
		payload: TransactionCreatedEvent,
	): Promise<void> {
		const transaction = await this.findTransaction(payload.id, payload.userId);

		if (!transaction) {
			throw new InvalidTransactionError('Transaction not found.');
		}

		const payable = this.createPayable(
			transaction,
			calculateFee(transaction).toString(),
		);

		transaction.payable = payable;

		await this.payableRepository.create(payable);
		await this.transactionRepository.saveTransaction(transaction);
	}

	private async findTransaction(transactionId: string, userId: string) {
		return this.transactionRepository.findTransactionById({
			transactionId,
			userId,
		});
	}

	private createPayable(
		{ id, paymentMethod, createdAt }: Transaction,
		fee: string,
	): Payable {
		const payableProps = {
			fee,
			transactionId: id,
		};

		if (paymentMethod === 'credit_card') {
			const createdAtPlus30Days = new Date(
				createdAt.setDate(createdAt.getDate() + 30),
			);

			return new Payable({
				...payableProps,
				status: 'waiting_funds',
				paymentDate: createdAtPlus30Days,
			});
		} else if (paymentMethod === 'debit_card') {
			return new Payable({
				...payableProps,
				status: 'paid',
				paymentDate: createdAt,
			});
		}

		throw new ServerError('Unsupported payment method.');
	}
}
