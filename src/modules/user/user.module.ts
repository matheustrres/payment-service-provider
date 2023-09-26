import { Module } from '@nestjs/common';

import {
	CreateUserRepository,
	FindUserByEmailRepository,
	FindUserByIdRepository,
} from './data/repositories';
import { CreateUserService } from './domain/services/create-user';
import { PgUserRepository } from './infra/database/user-repository';
import { UserController } from './infra/http/user.controller';

import { HashString } from '@core/contracts/hashing';

import { HashModule } from '@infra/providers/hashing/hash.module';

type CreateUserServiceRepository = CreateUserRepository &
	FindUserByEmailRepository;

@Module({
	imports: [HashModule],
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
			useFactory: (
				userRepository: CreateUserServiceRepository,
				hashService: HashString,
			) => new CreateUserService(userRepository, hashService),
			inject: [CreateUserRepository, HashString],
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
