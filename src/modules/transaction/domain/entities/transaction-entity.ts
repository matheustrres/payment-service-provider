import { type Card } from './card/card';

import { BaseEntity, type BaseProps } from '@core/base-entity';
import { type Optional } from '@core/helpers/optional';

export type TransactionProps = BaseProps & {
	userId: string;
	payableId?: string;
	value: string;
	paymentMethod: string;
	description?: string;
	card: Card;
};

export type OptionalTransactionProps = Optional<TransactionProps, 'createdAt'>;

export class Transaction extends BaseEntity<TransactionProps> {
	public constructor(props: OptionalTransactionProps, id?: string) {
		super(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		);
	}

	public get userId(): string {
		return this.props.userId;
	}

	public get payableId(): string | undefined {
		return this.props.payableId;
	}

	public get value(): string {
		return this.props.value;
	}

	public get description(): string | undefined {
		return this.props.description;
	}

	public get card(): Card {
		return this.props.card;
	}
}
