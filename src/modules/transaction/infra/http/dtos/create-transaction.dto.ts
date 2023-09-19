import {
	IsDateString,
	IsDecimal,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator';

enum PaymentMethod {
	DEBIT_CARD = 'debit_card',
	CREDIT_CARD = 'credit_card',
}

export class CreateTransactionDto {
	@IsDecimal()
	@IsNotEmpty()
	value: string;

	@IsString()
	@IsOptional()
	description?: string;

	@IsEnum(PaymentMethod)
	@IsNotEmpty()
	paymentMethod: PaymentMethod;

	@IsString()
	@MinLength(16)
	@MaxLength(16)
	@IsNotEmpty()
	cardNumber: string;

	@IsString()
	@IsNotEmpty()
	cardOwnerName: string;

	@IsDateString()
	@IsNotEmpty()
	cardExpirationDate: Date;

	@IsString()
	@MinLength(3)
	@MaxLength(3)
	@IsNotEmpty()
	cardCVV: string;

	@IsString()
	@IsNotEmpty()
	userId: string;
}
