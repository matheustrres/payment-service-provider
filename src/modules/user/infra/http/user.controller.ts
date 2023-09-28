import {
	Body,
	Controller,
	Post,
	Res,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';

import { CreateUserDto } from './dtos';
import { type UserToJSON, UserViewModel } from './user.view-model';

import { type ApiHttpResponse } from '@types';

import { LoggedInUser } from '@infra/http/authentication/decorators/logged-user.decorator';
import { LocalAuthGuard } from '@infra/http/authentication/guards/local-auth.guard';
import { JwtTokenInterceptor } from '@infra/http/authentication/interceptors/jwt-token.interceptor';

import { User } from '@modules/user/domain/entities/user-entity';
import { CreateUserService } from '@modules/user/domain/services/create-user';

@Controller('users')
export class UserController {
	public constructor(private readonly createUserService: CreateUserService) {}

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
	@UseGuards(LocalAuthGuard)
	@UseInterceptors(JwtTokenInterceptor)
	public async loginUserRoute(@LoggedInUser() user: User): Promise<UserToJSON> {
		return UserViewModel.toJSON(user);
	}
}

type UserResponse = ApiHttpResponse<UserToJSON>;
