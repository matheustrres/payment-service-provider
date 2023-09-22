import { Module } from '@nestjs/common';

import {
	CreatePayableRepository,
	ListUserPayablesRepository,
	SavePayableRepository,
} from './data/repositories';
import { ListUserPayablesService } from './domain/services/list-user-payables';
import { PgPayableRepository } from './infra/database/payable-repository';
import { PayableController } from './infra/http/payable.controller';

import { FindUserByIdRepository } from '@modules/user/data/repositories';
import { UserModule } from '@modules/user/user.module';

@Module({
	imports: [UserModule],
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
		{
			provide: ListUserPayablesService,
			useFactory: (
				payableRepository: ListUserPayablesRepository,
				userRepository: FindUserByIdRepository,
			) => new ListUserPayablesService(payableRepository, userRepository),
			inject: [ListUserPayablesRepository, FindUserByIdRepository],
		},
	],
	controllers: [PayableController],
	exports: [CreatePayableRepository, SavePayableRepository],
})
export class PayableModule {}
