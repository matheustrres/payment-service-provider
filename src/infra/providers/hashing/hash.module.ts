import { Module } from '@nestjs/common';

import { HashService } from './hash.service';

import { CompareStrings, HashString } from '@core/contracts/hashing';

@Module({
	providers: [
		{
			provide: CompareStrings,
			useClass: HashService,
		},
		{
			provide: HashString,
			useExisting: CompareStrings,
		},
	],
	exports: [CompareStrings, HashString],
})
export class HashModule {}
