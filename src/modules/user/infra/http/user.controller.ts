import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';
import { UserViewModel } from './user.view-model';

import { CreateUserService } from '@modules/user/domain/services/create-user';

@Controller('users')
export class UserController {
	public constructor(private readonly createUserService: CreateUserService) {}

	@Post()
	public async createUserRoute(@Body() body: CreateUserDto) {
		const { user } = await this.createUserService.exec(body);

		return UserViewModel.toHTTP(user);
	}
}
