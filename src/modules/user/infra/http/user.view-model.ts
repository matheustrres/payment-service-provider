import {
	type PayableToJSON,
	PayableViewModel,
} from '@modules/payable/infra/http/payable.view-model';
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
	payables?: PayableToJSON[];
	created_at: Date;
	updated_at?: Date;
};

export class UserViewModel {
	public static toJSON(
		{ id, name, email, transactions, payables, createdAt, updatedAt }: User,
		loadTransactions: boolean = false,
		loadPayables: boolean = false,
	): UserToJSON {
		return {
			id,
			name,
			email,
			...(transactions?.length &&
				loadTransactions && {
					transactions: transactions.map((t) => TransactionViewModel.toJSON(t)),
				}),
			...(payables?.length &&
				loadPayables && {
					payables: payables.map((p) => PayableViewModel.toJSON(p)),
				}),
			created_at: createdAt,
			...(updatedAt && {
				updated_at: updatedAt,
			}),
		};
	}
}
