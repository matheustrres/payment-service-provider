import {
	type CallHandler,
	type ExecutionContext,
	Injectable,
	type NestInterceptor,
} from '@nestjs/common';
import { type HttpArgumentsHost } from '@nestjs/common/interfaces';
import { type Response } from 'express';
import { type Observable, map } from 'rxjs';

import { type User } from '@modules/user/domain/entities/user-entity';

type LoginUserResponse = {
	user: User;
	access_token: string;
};

@Injectable()
export class JwtInterceptor implements NestInterceptor {
	public intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Observable<LoginUserResponse> {
		return next.handle().pipe(
			map((val: LoginUserResponse): LoginUserResponse => {
				const http: HttpArgumentsHost = context.switchToHttp();
				const response: Response = http.getResponse<Response>();

				response.setHeader('Authorization', `Bearer ${val.access_token}`);

				return val;
			}),
		);
	}
}
