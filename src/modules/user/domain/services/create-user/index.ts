import { User } from '../../entities/user-entity';

import { type BaseService } from '@core/base-service';

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
	public constructor(private readonly userRepository: UserRepository) {}

	public async exec(request: CreateUserRequest): Promise<CreateUserResponse> {
		const user = await this.userRepository.findUserByEmail(request.email);

		if (user) {
			throw new Error(`The email "${request.email}" is already being used.`);
		}

		const newUser = new User({
			...request,
			transactions: [],
		});

		await this.userRepository.create(newUser);

		return {
			user: newUser,
		};
	}
}
