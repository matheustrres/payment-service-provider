import { User } from '../../entities/user-entity';
import { InvalidUserError } from '../../errors/invalid-user.error';

import { type BaseService } from '@core/base-service';
import { type HashString } from '@core/contracts/hashing';

import {
	type CreateUserRepository,
	type FindUserByEmailRepository,
} from '@modules/user/data/repositories/';

export type CreateUserRequest = {
	name: string;
	email: string;
	password: string;
};

export type CreateUserResponse = {
	user: User;
};

type UserRepository = CreateUserRepository & FindUserByEmailRepository;

export class CreateUserService
	implements BaseService<CreateUserRequest, CreateUserResponse>
{
	public constructor(
		private readonly userRepository: UserRepository,
		private readonly hashService: HashString,
	) {}

	public async exec(request: CreateUserRequest): Promise<CreateUserResponse> {
		const user = await this.userRepository.findUserByEmail(request.email);

		if (user) {
			throw new InvalidUserError(
				`The email "${request.email}" is already being used.`,
			);
		}

		const password: string = await this.hashService.hashString(
			request.password,
		);

		const newUser = new User({
			...request,
			password,
			transactions: [],
		});

		await this.userRepository.create(newUser);

		return {
			user: newUser,
		};
	}
}
