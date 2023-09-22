import { type Payable } from '../../entities/payable-entity';

import { type BaseService } from '@core/base-service';
import { ServerError } from '@core/errors/server-error';

import { type ListUserPayablesRepository } from '@modules/payable/data/repositories';
import { type FindUserByIdRepository } from '@modules/user/data/repositories';
import { InvalidUserError } from '@modules/user/domain/errors/invalid-user.error';

export type ListUserPayablesRequest = {
	userId: string;
	status?: string; // paid | waiting_funds
};

export type ListUserPayablesResponse = {
	payables: Payable[];
};

export class ListUserPayablesService
	implements BaseService<ListUserPayablesRequest, ListUserPayablesResponse>
{
	public constructor(
		private readonly payableRepository: ListUserPayablesRepository,
		private readonly userRepository: FindUserByIdRepository,
	) {}

	public async exec({
		status,
		userId,
	}: ListUserPayablesRequest): Promise<ListUserPayablesResponse> {
		const user = await this.userRepository.findUserById(userId);

		if (!user) {
			throw new InvalidUserError(`No user were found with ID "${userId}".`);
		}

		const payables = await this.payableRepository.listUserPayables({
			status,
			userId: user.id,
		});

		if (!payables?.length) {
			throw new ServerError(`No payables were found.`);
		}

		return {
			payables,
		};
	}
}
