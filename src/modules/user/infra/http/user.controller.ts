import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { CreateUserDto } from './dtos';
import { LoginUserDto } from './dtos/login-user.dto';
import { type UserToJSON, UserViewModel } from './user.view-model';

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
	public async loginUserRoute(
		@Body() body: LoginUserDto,
		@Res() response: Response,
	): Promise<UserResponse> {
		const { user } = await this.loginUserService.exec(body);

		return response.send({
			user: UserViewModel.toJSON(user),
		});
	}
}

type UserResponse = Response<{
	user: UserToJSON;
}>;
