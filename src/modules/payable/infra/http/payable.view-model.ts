import { type Payable } from '@modules/payable/domain/entities/payable-entity';
import {
	type TransactionToJSON,
	TransactionViewModel,
} from '@modules/transaction/infra/http/transaction.view-model';

export type PayableToJSON = {
	id: string;
	transactionId: string;
	status: string;
	fee: string;
	paymentDate: Date;
	transaction?: TransactionToJSON;
	created_at: Date;
	updated_at?: Date;
};

export class PayableViewModel {
	public static toJSON(
		payable: Payable,
		loadTransaction: boolean = false,
	): PayableToJSON {
		return {
			id: payable.id,
			transactionId: payable.transactionId,
			status: payable.status,
			fee: payable.fee,
			...(payable.transaction &&
				loadTransaction && {
					transaction: TransactionViewModel.toJSON(payable.transaction),
				}),
			paymentDate: payable.paymentDate,
			created_at: payable.createdAt,
			updated_at: payable.updatedAt,
		};
	}
}
