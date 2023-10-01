import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export enum PayableStatus {
	AVAILABLE = 'paid',
	WAITING_FUNDS = 'waiting_funds',
}

const ListUserPayablesSchema = z.object({
	status: z.nativeEnum(PayableStatus).optional(),
});

export class ListUserPayablesDto extends createZodDto(ListUserPayablesSchema) {}
