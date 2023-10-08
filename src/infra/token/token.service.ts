import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { type SignTokenService } from '@core/contracts/token/sign-token';

@Injectable()
export class TokenService implements SignTokenService {
	constructor(private readonly jwtService: JwtService) {}

	public async signToken<T extends object>(payload: T): Promise<string> {
		return this.jwtService.sign(payload);
	}
}
