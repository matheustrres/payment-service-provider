import {
	type CanActivate,
	type ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { type HttpArgumentsHost } from '@nestjs/common/interfaces';
import { AuthGuard as NestPassportAuthGuard } from '@nestjs/passport';
import { type Request } from 'express';

import { type User } from '@modules/user/domain/entities/user-entity';

@Injectable()
export class LocalAuthGuard
	extends NestPassportAuthGuard('local')
	implements CanActivate
{
	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const canActivate = (await super.canActivate(context)) as boolean;

		if (context.getType() === 'http') {
			const http: HttpArgumentsHost = context.switchToHttp();
			const { user }: Request = http.getRequest<Request>();

			if (!user) {
				throw new UnauthorizedException('Invalid user credentials');
			}

			super.handleRequest<User>(null, user, null, context);
		}

		return canActivate;
	}
}
