import { type ExecutionContext, createParamDecorator } from '@nestjs/common';
import { type HttpArgumentsHost } from '@nestjs/common/interfaces';
import { type Request } from 'express';

import { type User } from '@modules/user/domain/entities/user-entity';

export const LoggedInUser = createParamDecorator<any, ExecutionContext, User>(
	(_: any, ctx: ExecutionContext): User => {
		const http: HttpArgumentsHost = ctx.switchToHttp();
		const request: Request = http.getRequest<Request>();

		return request.user as User;
	},
);
