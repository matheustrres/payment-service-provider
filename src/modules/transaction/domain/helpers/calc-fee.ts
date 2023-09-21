import { type Transaction } from '../entities/transaction-entity';

enum PaymentMethodFee {
	'debit_card' = 0.03,
	'credit_card' = 0.05,
}

export const calculateFee = ({ paymentMethod, value }: Transaction): number => {
	const transactionVal = parseInt(value);

	return (
		transactionVal -
		transactionVal *
			PaymentMethodFee[paymentMethod as keyof typeof PaymentMethodFee]
	);
};
