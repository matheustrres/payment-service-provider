import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';

import { ListUserPayablesDto } from './dtos/list-user-payables.dto';
import { type PayableToJSON, PayableViewModel } from './payable.view-model';

import { ListUserPayablesService } from '@modules/payable/domain/services/list-user-payables';

@Controller('payables')
export class PayableController {
	public constructor(
		private readonly listUserPayablesService: ListUserPayablesService,
	) {}

	@Get()
	public async listUserPayablesRoute(
		@Query() query: ListUserPayablesDto,
		@Res() response: Response,
	): Promise<Response<PayableToJSON>> {
		const { payables } = await this.listUserPayablesService.exec({
			status: query.status,
			userId: query.user_id,
		});

		return response.send({
			payables: payables.map((payable) => PayableViewModel.toJSON(payable)),
		});
	}
}
