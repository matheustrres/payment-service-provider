import { Module } from '@nestjs/common';

import { HashService } from './hash.service';

import { HashString } from '@core/contracts/hashing';

@Module({
	providers: [
		{
			provide: HashString,
			useClass: HashService,
		},
	],
	exports: [HashString],
})
export class HashModule {}
