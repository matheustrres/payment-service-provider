import { Module } from '@nestjs/common';

import {
	CreateUserRepository,
	FindUserByEmailRepository,
	FindUserByIdRepository,
} from './data/repositories';
import { CreateUserService } from './domain/services/create-user';
import { LoginUserService } from './domain/services/login-user';
import { PgUserRepository } from './infra/database/user-repository';
import { UserController } from './infra/http/user.controller';

import { CompareStrings, HashString } from '@core/contracts/hashing';
import { SignTokenService } from '@core/contracts/token/sign-token';

import { HashModule } from '@infra/providers/hashing/hash.module';
import { TokenModule } from '@infra/token/token.module';

type CreateUserServiceRepository = CreateUserRepository &
	FindUserByEmailRepository;

@Module({
	imports: [HashModule, TokenModule],
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
		{
			provide: LoginUserService,
			useFactory: (
				userRepository: FindUserByEmailRepository,
				hashService: CompareStrings,
				tokenService: SignTokenService,
			) => new LoginUserService(userRepository, hashService, tokenService),
			inject: [FindUserByEmailRepository, CompareStrings, SignTokenService],
		},
	],
	controllers: [UserController],
	exports: [
		CreateUserRepository,
		FindUserByEmailRepository,
		FindUserByIdRepository,
		LoginUserService,
	],
})
export class UserModule {}
