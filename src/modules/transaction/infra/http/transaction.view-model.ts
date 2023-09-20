import { type Transaction } from '@modules/transaction/domain/entities/transaction-entity';

export type TransactionToJSON = {
	id: string;
	user_id: string;
	payable_id?: string;
	value: string;
	description?: string;
	card_cvv: string;
	card_expiration_date: Date;
	card_owner_name: string;
	card_number: string;
	created_at: Date;
	updated_at?: Date;
};

export class TransactionViewModel {
	public static toJSON(transaction: Transaction): TransactionToJSON {
		return {
			id: transaction.id,
			user_id: transaction.userId,
			...(transaction.payableId && {
				payable_id: transaction.payableId,
			}),
			value: transaction.value,
			...(transaction.description && {
				description: transaction.description,
			}),
			card_cvv: transaction.cardCVV,
			card_expiration_date: transaction.cardExpirationDate,
			card_owner_name: transaction.cardOwnerName,
			card_number: transaction.cardNumber,
			created_at: transaction.createdAt,
			...(transaction.updatedAt && {
				updated_at: transaction.updatedAt,
			}),
		};
	}
}
