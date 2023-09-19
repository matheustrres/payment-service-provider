import {
	type TransactionToHTTP,
	TransactionViewModel,
} from '@modules/transaction/infra/http/transaction.view-model';
import { type User } from '@modules/user/domain/entities/user-entity';

export type UserToHTTP = {
	id: string;
	name: string;
	email: string;
	transactions?: TransactionToHTTP[];
	created_at: Date;
	updated_at?: Date;
};

export class UserViewModel {
	public static toHTTP(
		{ id, name, email, transactions, createdAt, updatedAt }: User,
		loadTransactions: boolean = false,
	): UserToHTTP {
		return {
			id,
			name,
			email,
			created_at: createdAt,
			...(transactions?.length &&
				loadTransactions && {
					transactions: transactions.map(TransactionViewModel.toHTTP),
				}),
			...(updatedAt && {
				updated_at: updatedAt,
			}),
		};
	}
}
