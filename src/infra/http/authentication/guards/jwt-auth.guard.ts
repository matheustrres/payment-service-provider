import {
	type CanActivate,
	type ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard as NestPassportAuthGuard } from '@nestjs/passport';
import { type Request } from 'express';
import { type IncomingHttpHeaders } from 'http';

import { FindUserByEmailRepository } from '@modules/user/data/repositories';

@Injectable()
export class JwtAuthGuard
	extends NestPassportAuthGuard('jwt')
	implements CanActivate
{
	public constructor(
		private readonly jwtService: JwtService,
		private readonly userRepository: FindUserByEmailRepository,
	) {
		super();
	}

	public async canActivate(context: ExecutionContext) {
		const request = this.getRequest(context) as Request;

		const token = this.extractAuthTokenFromHeaders(request.headers);

		if (!token)
			throw new UnauthorizedException(
				this.getJwtErrorMessage('JsonWebTokenNotFoundError'),
			);

		let payload: JwtPayload;

		try {
			payload = this.jwtService.verify<JwtPayload>(token);
		} catch (error) {
			const { name } = error as Error;

			throw new UnauthorizedException(name as JwtError);
		}

		const user = await this.userRepository.findUserByEmail(payload.sub);

		if (!user) {
			throw new UnauthorizedException('Invalid credentials');
		}

		request.user = user;

		return true;
	}

	private extractAuthTokenFromHeaders(
		headers: IncomingHttpHeaders,
	): string | undefined {
		const [type, token] = headers.authorization?.split(' ') ?? [];

		return type === 'Bearer' ? token : undefined;
	}

	private getJwtErrorMessage(errorName: JwtError): string {
		return (
			{
				JsonWebTokenError: 'Invalid authentication token signature',
				JsonWebTokenNotFoundError:
					'No authentication token found in the authentication header',
				TokenExpiredError: 'Authentication token is expired',
			}[errorName] || 'Invalid authentication token'
		);
	}
}

type JwtPayload = {
	sub: string;
	iat: number;
	exp: number;
};

type JwtError =
	| 'JsonWebTokenError'
	| 'JsonWebTokenNotFoundError'
	| 'TokenExpiredError';
