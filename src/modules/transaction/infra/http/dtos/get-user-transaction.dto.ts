import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const GetUserTransactionSchema = z.object({
	userId: z.string().uuid().nonempty(),
	transactionId: z.string().uuid().nonempty(),
});

export class GetUserTransactionDto extends createZodDto(
	GetUserTransactionSchema,
) {}
