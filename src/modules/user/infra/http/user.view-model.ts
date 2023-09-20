import {
	type TransactionToJSON,
	TransactionViewModel,
} from '@modules/transaction/infra/http/transaction.view-model';
import { type User } from '@modules/user/domain/entities/user-entity';

export type UserToJSON = {
	id: string;
	name: string;
	email: string;
	transactions?: TransactionToJSON[];
	created_at: Date;
	updated_at?: Date;
};

export class UserViewModel {
	public static toJSON(
		{ id, name, email, transactions, createdAt, updatedAt }: User,
		loadTransactions: boolean = false,
	): UserToJSON {
		return {
			id,
			name,
			email,
			created_at: createdAt,
			...(transactions?.length &&
				loadTransactions && {
					transactions: transactions.map(TransactionViewModel.toJSON),
				}),
			...(updatedAt && {
				updated_at: updatedAt,
			}),
		};
	}
}
