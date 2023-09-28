import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { ListUserPayablesDto } from './dtos';
import { type PayableToJSON, PayableViewModel } from './payable.view-model';

import { LoggedInUser } from '@infra/http/authentication/decorators/logged-user.decorator';
import { JwtAuthGuard } from '@infra/http/authentication/guards/jwt-auth.guard';

import { ListUserPayablesService } from '@modules/payable/domain/services/list-user-payables';
import { User } from '@modules/user/domain/entities/user-entity';

@Controller('payables')
@UseGuards(JwtAuthGuard)
export class PayableController {
	public constructor(
		private readonly listUserPayablesService: ListUserPayablesService,
	) {}

	@Get()
	public async listUserPayablesRoute(
		@LoggedInUser() user: User,
		@Query() query: ListUserPayablesDto,
	): Promise<PayableToJSON[]> {
		const { payables } = await this.listUserPayablesService.exec({
			...query,
			userId: user.id,
		});

		const mappedPayables: PayableToJSON[] = payables.map((payable) =>
			PayableViewModel.toJSON(payable),
		);

		return mappedPayables;
	}
}
