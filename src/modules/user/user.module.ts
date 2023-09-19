import { Module } from '@nestjs/common';

import {
	CreateUserRepository,
	FindUserByEmailRepository,
	FindUserByIdRepository,
} from './data/repositories';
import { CreateUserService } from './domain/services/create-user';
import { PgUserRepository } from './infra/database/user-repository';
import { UserController } from './infra/http/user.controller';

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
	controllers: [UserController],
	exports: [
		CreateUserRepository,
		FindUserByEmailRepository,
		FindUserByIdRepository,
	],
})
export class UserModule {}
