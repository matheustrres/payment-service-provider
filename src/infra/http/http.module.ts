import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { LocalStrategy } from './authentication/strategies/local.strategy';

import { TokenModule } from '@infra/token/token.module';

import { UserModule } from '@modules/user/user.module';

@Module({
	imports: [
		TokenModule,
		UserModule,
		PassportModule.register({
			defaultStrategy: 'jwt',
		}),
	],
	providers: [LocalStrategy],
})
export class HttpModule {}
