import { BaseEntity } from '@core/base-entity';
import { type GetBaseProps } from '@core/helpers/get-base-props';

import { type Transaction } from '@modules/transaction/domain/entities/transaction-entity';

export type UserProps = {
	name: string;
	email: string;
	password: string;
	transactions: Transaction[] | null;
};

export class User extends BaseEntity {
	public name: string;
	public email: string;
	public password: string;
	public transactions: Transaction[] | null;

	public constructor(props: GetBaseProps<UserProps>) {
		super(props);

		this.name = props.name;
		this.email = props.email;
		this.password = props.password;
		this.transactions = props.transactions ?? [];
	}
}
