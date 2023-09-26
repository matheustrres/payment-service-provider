import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';

import {
	type CompareStrings,
	type CompareStringsInput,
	type HashString,
} from '@core/contracts/hashing';

interface HashContract extends HashString, CompareStrings {}

@Injectable()
export class HashService implements HashContract {
	public async hashString(data: string): Promise<string> {
		const salt: string = await genSalt();

		return hash(data, salt);
	}

	public compareStrings(input: CompareStringsInput): Promise<boolean> {
		return compare(input.plainText, input.hash);
	}
}
