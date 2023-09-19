import { Module } from '@nestjs/common';

import {
	CreateUserRepository,
	FindUserByEmailRepository,
	FindUserByIdRepository,
} from './data/repositories';
import { CreateUserService } from './domain/services/create-user';
import { PgUserRepository } from './infra/database/user-repository';

type CreateUserServiceRepository = CreateUserRepository &
	FindUserByEmailRepository;

@Module({
	providers: [
		{
			provide: CreateUserRepository,
			useClass: PgUserRepository,
		},
		{
			provide: FindUserByEmailRepository,
			useExisting: CreateUserRepository,
		},
		{
			provide: FindUserByIdRepository,
			useExisting: CreateUserRepository,
		},
		{
			provide: CreateUserService,
			useFactory: (userRepository: CreateUserServiceRepository) =>
				new CreateUserService(userRepository),
			inject: [CreateUserRepository, FindUserByEmailRepository],
		},
	],
	exports: [
		CreateUserRepository,
		FindUserByEmailRepository,
		FindUserByIdRepository,
	],
})
export class UserModule {}
