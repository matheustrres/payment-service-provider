import { type User } from '../../entities/user-entity';
import { InvalidUserError } from '../../errors/invalid-user.error';

import { type JwtPayload } from '@types';

import { type BaseService } from '@core/base-service';
import { type CompareStrings } from '@core/contracts/hashing/compare-strings';
import { type SignTokenService } from '@core/contracts/token/sign-token';

import { type FindUserByEmailRepository } from '@modules/user/data/repositories';

export type LoginUserRequest = {
	email: string;
	password: string;
};

export type LoginUserResponse = {
	user: User;
	accessToken: string;
};

export class LoginUserService
	implements BaseService<LoginUserRequest, LoginUserResponse>
{
	public constructor(
		private readonly userRepository: FindUserByEmailRepository,
		private readonly hashService: CompareStrings,
		private readonly tokenService: SignTokenService,
	) {}

	public async exec(request: LoginUserRequest): Promise<LoginUserResponse> {
		const user = await this.userRepository.findUserByEmail(request.email);

		if (!user) throw new InvalidUserError('Invalid credentials.');

		const isValidPasword: boolean = await this.hashService.compareStrings({
			plainText: request.password,
			hash: user.password,
		});

		if (!isValidPasword) throw new InvalidUserError('Invalid credentials.');

		const accessToken = await this.tokenService.signToken<JwtPayload>({
			sub: user.id,
		});

		return {
			user,
			accessToken,
		};
	}
}
