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

	public get paymentMethod(): string {
		return this.props.paymentMethod;
	}

	public get description(): string | undefined {
		return this.props.description;
	}

	private get card(): Card {
		return this.props.card;
	}

	public get cardCVV(): string {
		return this.card.CVV;
	}

	public get cardOwnerName(): string {
		return this.card.ownerName;
	}

	public get cardExpirationDate(): Date {
		return this.card.expirationDate;
	}

	public get cardNumber(): string {
		return this.card.number;
	}
}
