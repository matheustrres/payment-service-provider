import { BaseEntity } from '@core/base-entity';
import { type GetBaseProps } from '@core/helpers/get-base-props';

import { type Transaction } from '@modules/transaction/domain/entities/transaction-entity';
import { type User } from '@modules/user/domain/entities/user-entity';

export type PayableProps = {
	userId: string;
	user?: User;
	transactionId: string;
	transaction?: Transaction;
	status: string;
	paymentDate: Date;
	fee: string;
};

export class Payable extends BaseEntity {
	public readonly userId: string;
	public user?: User;
	public readonly transactionId: string;
	public transaction?: Transaction;
	public readonly status: string; // 'paid | 'waiting_funds'
	public readonly paymentDate: Date;
	public readonly fee: string;

	public constructor(props: GetBaseProps<PayableProps>) {
		super(props);

		this.userId = props.userId;
		this.user = props.user;
		this.transactionId = props.transactionId;
		this.transaction = props.transaction;
		this.status = props.status;
		this.paymentDate = props.paymentDate;
		this.fee = props.fee;
	}

	public static isValidStatus(status: string): boolean {
		return ['paid', 'waiting_funds'].includes(status);
	}
}
