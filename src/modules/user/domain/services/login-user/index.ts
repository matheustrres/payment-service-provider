import { type User } from '../../entities/user-entity';
import { InvalidUserError } from '../../errors/invalid-user.error';

import { type BaseService } from '@core/base-service';
import { type CompareStrings } from '@core/contracts/hashing/compare-strings';

import { type FindUserByEmailRepository } from '@modules/user/data/repositories';

export type LoginUserRequest = {
	email: string;
	password: string;
};

export type LoginUserResponse = {
	user: User;
};

export class LoginUserService
	implements BaseService<LoginUserRequest, LoginUserResponse>
{
	public constructor(
		private readonly userRepository: FindUserByEmailRepository,
		private readonly hashService: CompareStrings,
	) {}

	public async exec(request: LoginUserRequest): Promise<LoginUserResponse> {
		const user = await this.userRepository.findUserByEmail(request.email);

		if (!user) throw new InvalidUserError('Invalid credentials.');

		const isValidPasword: boolean = await this.hashService.compareStrings({
			plainText: request.password,
			hash: user.password,
		});

		if (!isValidPasword) throw new InvalidUserError('Invalid credentials.');

		return {
			user,
		};
	}
}
