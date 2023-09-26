import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';

import { type HashString } from '@core/contracts/hashing';

@Injectable()
export class HashService implements HashString {
	public async hashString(data: string): Promise<string> {
		const salt: string = await genSalt();

		return hash(data, salt);
	}
}
