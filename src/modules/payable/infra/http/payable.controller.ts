import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiQuery,
	ApiTags,
} from '@nestjs/swagger';

import { ListUserPayablesApiResponse } from './api/docs/responses';
import { ListUserPayablesDto, PayableStatus } from './api/dtos';
import { type PayableToJSON, PayableViewModel } from './payable.view-model';

import { LoggedInUser } from '@infra/http/authentication/decorators/logged-user.decorator';
import { JwtAuthGuard } from '@infra/http/authentication/guards/jwt-auth.guard';

import { ListUserPayablesService } from '@modules/payable/domain/services/list-user-payables';
import { User } from '@modules/user/domain/entities/user-entity';

@ApiTags('payables')
@Controller('payables')
@UseGuards(JwtAuthGuard)
export class PayableController {
	public constructor(
		private readonly listUserPayablesService: ListUserPayablesService,
	) {}

	@Get()
	@ApiBearerAuth()
	@ApiOperation({
		description: 'List all user payables',
	})
	@ApiQuery({
		name: 'status',
		required: false,
		description: 'The current status of payables',
		enum: PayableStatus,
		example: 'paid',
	})
	@ApiParam({
		name: 'userId',
		required: true,
		description:
			'The current user id. Will be fetched automatically through authentication.',
		type: 'string',
	})
	@ApiBadRequestResponse({
		description: 'No user has been found with given id',
		status: 400,
	})
	@ApiOkResponse({
		type: ListUserPayablesApiResponse,
		isArray: true,
	})
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
