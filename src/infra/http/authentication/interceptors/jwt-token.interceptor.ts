import {
	type CallHandler,
	type ExecutionContext,
	Injectable,
	type NestInterceptor,
} from '@nestjs/common';
import { type HttpArgumentsHost } from '@nestjs/common/interfaces';
import { JwtService } from '@nestjs/jwt';
import { type Response } from 'express';
import { type Observable, map } from 'rxjs';

import { type User } from '@modules/user/domain/entities/user-entity';

@Injectable()
export class JwtTokenInterceptor implements NestInterceptor {
	public constructor(private readonly jwtService: JwtService) {}

	public intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Observable<User> {
		return next.handle().pipe(
			map((user: User): User => {
				const token: string = this.jwtService.sign({
					sub: user.email,
				});

				const http: HttpArgumentsHost = context.switchToHttp();
				const response: Response = http.getResponse<Response>();

				response.setHeader('Authorization', `Bearer ${token}`);

				return user;
			}),
		);
	}
}
