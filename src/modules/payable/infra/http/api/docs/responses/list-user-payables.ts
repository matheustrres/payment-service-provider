import crypto from 'node:crypto';

import { ApiProperty } from '@nestjs/swagger';

export class ListUserPayablesApiResponse {
	@ApiProperty({
		type: 'string',
		readOnly: true,
		example: crypto.randomUUID(),
	})
	id: string;

	@ApiProperty({
		type: 'string',
		readOnly: true,
		example: crypto.randomUUID(),
	})
	transactionId: string;

	@ApiProperty({
		type: 'string',
		readOnly: true,
		example: 'paid',
	})
	status: string;

	@ApiProperty({
		type: 'string',
		readOnly: true,
		example: '1187.5',
	})
	fee: string;

	@ApiProperty({
		type: 'date',
		readOnly: true,
		example: new Date(),
	})
	paymentDate: string;

	@ApiProperty({
		type: 'date',
		readOnly: true,
		example: new Date(),
	})
	created_at: Date;

	@ApiProperty({
		type: 'date',
		readOnly: true,
		example: new Date(),
	})
	updated_at: Date;
}
