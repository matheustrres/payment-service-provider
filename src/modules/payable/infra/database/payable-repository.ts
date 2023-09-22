import { Injectable } from '@nestjs/common';
import { type Repository } from 'typeorm';

import { PayableMapper } from './payable-mapper';
import { PgPayable } from './payable-model';

import { dataSource } from '@infra/database/typeorm/datasource';

import {
	type ListUserPayablesOptions,
	type CreatePayableRepository,
	type ListUserPayablesRepository,
	type SavePayableRepository,
} from '@modules/payable/data/repositories';
import { type Payable } from '@modules/payable/domain/entities/payable-entity';

type PayableRepository = CreatePayableRepository &
	ListUserPayablesRepository &
	SavePayableRepository;

@Injectable()
export class PgPayableRepository implements PayableRepository {
	private readonly repository: Repository<PgPayable>;

	public constructor() {
		this.repository = dataSource.getRepository(PgPayable);
	}

	public async create(payable: Payable): Promise<void> {
		await this.repository.save(payable);
	}

	public async listUserPayables({
		status,
		userId,
	}: ListUserPayablesOptions): Promise<Payable[] | null> {
		const pgPayables = await this.repository.find({
			where: {
				transaction: {
					userId,
				},
				status,
			},
		});

		return pgPayables.length
			? pgPayables.map((payable) => PayableMapper.toDomain(payable))
			: null;
	}

	public async savePayable(payable: Payable): Promise<void> {
		await this.repository.save(payable);
	}
}
