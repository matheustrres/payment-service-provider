import { type Card } from './card/card';

import { BaseEntity } from '@core/base-entity';
import { type GetBaseProps } from '@core/helpers/get-base-props';

export type TransactionProps = {
	userId: string;
	payableId?: string;
	value: string;
	paymentMethod: string;
	description?: string;
	card: Card;
};

export class Transaction extends BaseEntity {
	public readonly userId: string;
	public readonly payableId?: string;
	public readonly value: string;
	public readonly paymentMethod: string;
	public description?: string;
	public readonly cardCVV: string;
	public readonly cardExpirationDate: Date;
	public readonly cardNumber: string;
	public readonly cardOwnerName: string;

	public constructor(props: GetBaseProps<TransactionProps>) {
		super(props);

		this.userId = props.userId;
		this.payableId = props.payableId;
		this.value = props.value;
		this.paymentMethod = props.paymentMethod;
		this.description = props.description;
		this.cardCVV = props.card.CVV;
		this.cardExpirationDate = props.card.expirationDate;
		this.cardNumber = props.card.number;
		this.cardOwnerName = props.card.ownerName;
	}
}
