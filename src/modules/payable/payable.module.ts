import { Module } from '@nestjs/common';

import {
	CreatePayableRepository,
	ListUserPayablesRepository,
	SavePayableRepository,
} from './data/repositories';
import { PgPayableRepository } from './infra/database/payable-repository';

@Module({
	providers: [
		{
			provide: CreatePayableRepository,
			useClass: PgPayableRepository,
		},
		{
			provide: SavePayableRepository,
			useExisting: CreatePayableRepository,
		},
		{
			provide: ListUserPayablesRepository,
			useExisting: CreatePayableRepository,
		},
	],
	exports: [CreatePayableRepository, SavePayableRepository],
})
export class PayableModule {}
