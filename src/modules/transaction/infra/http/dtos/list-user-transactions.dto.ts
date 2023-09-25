import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const ListUserTransactionsSchema = z.object({
	userId: z.string().uuid().nonempty(),
});

export class ListUserTransactionsDto extends createZodDto(
	ListUserTransactionsSchema,
) {}
