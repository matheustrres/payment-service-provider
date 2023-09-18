import { BaseEntity, type BaseProps } from '@core/base-entity';
import { type Optional } from '@core/helpers/optional';

import { type Transaction } from '@modules/transaction/domain/entities/transaction-entity';

export type UserProps = BaseProps & {
	name: string;
	email: string;
	password: string;
	transactions: Transaction[] | null;
};

export type OptionalUserProps = Optional<
	UserProps,
	'createdAt' | 'transactions'
>;

export class User extends BaseEntity<UserProps> {
	public constructor(props: OptionalUserProps, id?: string) {
		super(
			{
				...props,
				transactions: props.transactions ?? [],
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		);
	}

	public get name(): string {
		return this.props.name;
	}

	public get email(): string {
		return this.props.email;
	}

	public get password(): string {
		return this.props.password;
	}

	public get transactions(): Transaction[] | null {
		return this.props.transactions;
	}
}
