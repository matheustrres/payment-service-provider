import { Injectable } from '@nestjs/common';
import { type Repository } from 'typeorm';

import { TransactionMapper } from './transaction-mapper';
import { PgTransaction } from './transaction-model';

import { dataSource } from '@infra/database/typeorm/datasource';

import {
	type SaveTransactionRepository,
	type CreateTransactionRepository,
	type FindTransactionByIdRepository,
	type FindTransactionOptions,
	type ListUserTransactionsRepository,
} from '@modules/transaction/data/repositories';
import { type Transaction } from '@modules/transaction/domain/entities/transaction-entity';

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
			relations: {
				payable: true,
			},
		});

		if (!transaction) return null;

		return TransactionMapper.toDomain(transaction, {
			payable: true,
		});
	}

	public async listUserTransactions(
		userId: string,
	): Promise<Transaction[] | null> {
		const pgUserTransactions: PgTransaction[] = await this.repository.find({
			where: {
				userId,
			},
			relations: {
				payable: true,
			},
		});

		return pgUserTransactions.map((transaction) =>
			TransactionMapper.toDomain(transaction, { payable: true }),
		);
	}

	public async saveTransaction(transaction: Transaction): Promise<void> {
		await this.repository.save(transaction);
	}
}
