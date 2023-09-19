import { Injectable } from '@nestjs/common';
import { dataSource } from 'infra/database/typeorm/datasource';
import { type Repository } from 'typeorm';

import { TransactionMapper } from './transaction-mapper';

import { type CreateTransactionRepository } from '@modules/transaction/data/repositories/create-transaction-repository';
import { type ListUserTransactionsRepository } from '@modules/transaction/data/repositories/list-user-transactions-repository';
import { type Transaction } from '@modules/transaction/domain/entities/transaction-entity';
import { PgTransaction } from '@modules/transaction/domain/models/transaction-model';

type TransactionRepository = CreateTransactionRepository &
	ListUserTransactionsRepository;

@Injectable()
export class PgTransactionRepository implements TransactionRepository {
	private readonly repository: Repository<PgTransaction>;

	public constructor() {
		this.repository = dataSource.getRepository(PgTransaction);
	}

	public async create(data: Transaction): Promise<void> {
		await this.repository.save(data);
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
}
