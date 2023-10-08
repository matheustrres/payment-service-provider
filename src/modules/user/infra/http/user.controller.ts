import {
	Body,
	Controller,
	Get,
	Post,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';

import { CreateUserDto } from './dtos';
import { LoginUserDto } from './dtos/login-user.dto';
import { type UserToJSON, UserViewModel } from './user.view-model';

import { LoggedInUser } from '@infra/http/authentication/decorators/logged-user.decorator';
import { JwtAuthGuard } from '@infra/http/authentication/guards/jwt-auth.guard';
import { LocalAuthGuard } from '@infra/http/authentication/guards/local-auth.guard';
import { JwtInterceptor } from '@infra/http/authentication/interceptors/jwt.interceptor';

import { User } from '@modules/user/domain/entities/user-entity';
import { CreateUserService } from '@modules/user/domain/services/create-user';
import { LoginUserService } from '@modules/user/domain/services/login-user';

@Controller('users')
export class UserController {
	public constructor(
		private readonly createUserService: CreateUserService,
		private readonly loginUserService: LoginUserService,
	) {}

	@Post()
	public async createUserRoute(
		@Body() body: CreateUserDto,
	): Promise<UserToJSON> {
		const { user } = await this.createUserService.exec(body);

		return UserViewModel.toJSON(user);
	}

	@Post('login')
	@UseGuards(LocalAuthGuard)
	@UseInterceptors(JwtInterceptor)
	public async loginUserRoute(
		@Body() body: LoginUserDto,
	): Promise<LoginUserResponse> {
		const { accessToken, user } = await this.loginUserService.exec(body);

		return {
			user: UserViewModel.toJSON(user, false, false),
			access_token: accessToken,
		};
	}

	@Get('me')
	@UseGuards(JwtAuthGuard)
	public getMeRoute(@LoggedInUser() user: User): UserToJSON {
		return UserViewModel.toJSON(user, true, true);
	}
}

type LoginUserResponse = {
	user: UserToJSON;
	access_token: string;
};
