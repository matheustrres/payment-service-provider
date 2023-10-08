import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { TokenService } from './token.service';

import { Env } from '@core/config/env';
import { SignTokenService } from '@core/contracts/token/sign-token';
const TWENTY_FOUR_HOURS_IN_MS: number = 24 * 60 * 60 * 1000;
@Module({
	imports: [
		JwtModule.register({
			global: true,
			secret: Env.JWT_MD5_SECRET_KEY,
			signOptions: {
				algorithm: 'HS384',
				expiresIn: TWENTY_FOUR_HOURS_IN_MS,
			},
			verifyOptions: {
				algorithms: ['HS384'],
				ignoreExpiration: false,
			},
		}),
	],
	providers: [
		{
			provide: SignTokenService,
			useClass: TokenService,
		},
	],
	exports: [SignTokenService],
})
export class TokenModule {}
