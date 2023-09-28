import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '@modules/user/user.module';

const TWENTY_FOUR_HOURS_IN_MS: number = 24 * 60 * 60 * 1000;

@Module({
	imports: [
		UserModule,
		PassportModule.register({
			defaultStrategy: 'jwt',
		}),
		JwtModule.register({
			global: true,
			secret: process.env.JWT_MD5_SECRET_KEY,
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
})
export class HttpModule {}
