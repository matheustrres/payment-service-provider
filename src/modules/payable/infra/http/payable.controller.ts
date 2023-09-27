import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';

import { ListUserPayablesDto } from './dtos';
import { type PayableToJSON, PayableViewModel } from './payable.view-model';

import { type ApiHttpResponse } from '@types';

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
	): Promise<PayablesResponse> {
		const { payables } = await this.listUserPayablesService.exec(query);

		const mappedPayables: PayableToJSON[] = payables.map((payable) =>
			PayableViewModel.toJSON(payable),
		);

		return response.send({
			payables: mappedPayables,
		});
	}
}

type PayablesResponse = ApiHttpResponse<PayableToJSON[]>;
