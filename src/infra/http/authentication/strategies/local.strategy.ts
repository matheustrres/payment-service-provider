import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as PassportLocalStrategy } from 'passport-local';

import { type User } from '@modules/user/domain/entities/user-entity';
import { LoginUserService } from '@modules/user/domain/services/login-user';

@Injectable()
export class LocalStrategy extends PassportStrategy(
	PassportLocalStrategy,
	'local',
) {
	public constructor(private readonly loginUserService: LoginUserService) {
		super({
			usernameField: 'email',
			passReqToCallback: false,
		});
	}

	public async validate(email: string, password: string): Promise<User> {
		const { user } = await this.loginUserService.exec({
			email,
			password,
		});

		return user;
	}
}
