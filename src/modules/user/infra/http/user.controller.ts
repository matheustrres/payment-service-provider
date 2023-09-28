import {
	Body,
	Controller,
	Get,
	Post,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';

import { CreateUserDto } from './dtos';
import { type UserToJSON, UserViewModel } from './user.view-model';

import { LoggedInUser } from '@infra/http/authentication/decorators/logged-user.decorator';
import { JwtAuthGuard } from '@infra/http/authentication/guards/jwt-auth.guard';
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
	): Promise<UserToJSON> {
		const { user } = await this.createUserService.exec(body);

		return UserViewModel.toJSON(user);
	}

	@Post('login')
	@UseGuards(LocalAuthGuard)
	@UseInterceptors(JwtTokenInterceptor)
	public async loginUserRoute(@LoggedInUser() user: User): Promise<UserToJSON> {
		return UserViewModel.toJSON(user);
	}

	@Get('me')
	@UseGuards(JwtAuthGuard)
	public getMeRoute(@LoggedInUser() user: User): UserToJSON {
		return UserViewModel.toJSON(user, true);
	}
}
