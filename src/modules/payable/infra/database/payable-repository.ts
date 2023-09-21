import { Injectable } from '@nestjs/common';
import { dataSource } from 'infra/database/typeorm/datasource';
import { type Repository } from 'typeorm';

import {
	type CreatePayableRepository,
	type SavePayableRepository,
} from '@modules/payable/data/repositories';
import { type Payable } from '@modules/payable/domain/entities/payable-entity';
import { PgPayable } from '@modules/payable/domain/models/payable-model';

type PayableRepository = CreatePayableRepository & SavePayableRepository;

@Injectable()
export class PgPayableRepository implements PayableRepository {
	private readonly repository: Repository<PgPayable>;

	public constructor() {
		this.repository = dataSource.getRepository(PgPayable);
	}

	public async create(payable: Payable): Promise<void> {
		await this.repository.save(payable);
	}

	public async savePayable(payable: Payable): Promise<void> {
		await this.repository.save(payable);
	}
}
