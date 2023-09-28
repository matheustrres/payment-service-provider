import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

enum PaymentMethod {
	DEBIT_CARD = 'debit_card',
	CREDIT_CARD = 'credit_card',
}

const decimalSchema = z
	.string()
	.nonempty()
	.transform((arg: string): string => {
		const float: number = parseFloat(arg);

		if (isNaN(float)) throw new TypeError('Invalid decimal value');

		return float.toString();
	});

const CreateTransactionSchema = z.object({
	value: decimalSchema,
	description: z.string().optional(),
	paymentMethod: z.nativeEnum(PaymentMethod),
	cardNumber: z.string().min(16).max(16).nonempty(),
	cardOwnerName: z.string().nonempty(),
	cardExpirationDate: z.dateString(),
	cardCVV: z.string().min(3).max(3).nonempty(),
});

export class CreateTransactionDto extends createZodDto(
	CreateTransactionSchema,
) {}
