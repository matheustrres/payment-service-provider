import { Injectable } from '@nestjs/common';
import { type Repository } from 'typeorm';

import { TransactionMapper } from './transaction-mapper';

import { dataSource } from '@infra/database/typeorm/datasource';

import {
	type SaveTransactionRepository,
	type CreateTransactionRepository,
	type FindTransactionByIdRepository,
	type FindTransactionOptions,
	type ListUserTransactionsRepository,
} from '@modules/transaction/data/repositories';
import { type Transaction } from '@modules/transaction/domain/entities/transaction-entity';
import { PgTransaction } from '@modules/transaction/domain/models/transaction-model';

type TransactionRepository = CreateTransactionRepository &
	ListUserTransactionsRepository &
	FindTransactionByIdRepository &
	SaveTransactionRepository;

@Injectable()
export class PgTransactionRepository implements TransactionRepository {
	private readonly repository: Repository<PgTransaction>;

	public constructor() {
		this.repository = dataSource.getRepository(PgTransaction);
	}

	public async create(data: Transaction): Promise<void> {
		await this.repository.save(data);
	}

	public async findTransactionById({
		transactionId,
		userId,
	}: FindTransactionOptions): Promise<Transaction | null> {
		const transaction = await this.repository.findOne({
			where: {
				id: transactionId,
				userId,
			},
		});

		if (!transaction) return null;

		return TransactionMapper.toDomain(transaction);
	}

	public async listUserTransactions(
		userId: string,
	): Promise<Transaction[] | null> {
		const pgUserTransactions = await this.repository.find({
			where: {
				userId,
			},
		});

		return pgUserTransactions.length
			? pgUserTransactions.map((uT) => TransactionMapper.toDomain(uT))
			: null;
	}

	public async saveTransaction(transaction: Transaction): Promise<void> {
		await this.repository.save(transaction);
	}
}
