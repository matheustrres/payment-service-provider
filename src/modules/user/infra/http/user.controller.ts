import { Body, Controller, Post, Res, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';

import { CreateUserDto } from './dtos';
import { LoginUserDto } from './dtos/login-user.dto';
import { type UserToJSON, UserViewModel } from './user.view-model';

import { type ApiHttpResponse } from '@types';

import { JwtTokenInterceptor } from '@infra/http/authentication/interceptors/jwt-token.interceptor';

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
		@Res() response: Response,
	): Promise<UserResponse> {
		const { user } = await this.createUserService.exec(body);

		return response.send({
			user: UserViewModel.toJSON(user),
		});
	}

	@Post('login')
	@UseInterceptors(JwtTokenInterceptor)
	public async loginUserRoute(@Body() body: LoginUserDto): Promise<UserToJSON> {
		const { user } = await this.loginUserService.exec(body);

		return UserViewModel.toJSON(user);
	}
}

type UserResponse = ApiHttpResponse<UserToJSON>;
