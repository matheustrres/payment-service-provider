import { type Card } from './card/card';

import { BaseEntity } from '@core/base-entity';
import { type GetBaseProps } from '@core/helpers/get-base-props';

import { type Payable } from '@modules/payable/domain/entities/payable-entity';
import { type User } from '@modules/user/domain/entities/user-entity';

export type TransactionProps = {
	userId: string;
	user?: User;
	payableId?: string;
	payable?: Payable;
	value: string;
	paymentMethod: string;
	description?: string;
	card: Card;
};

export class Transaction extends BaseEntity {
	public readonly userId: string;
	public user?: User;
	public readonly payableId?: string;
	public payable?: Payable;
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
		this.user = props.user;
		this.payableId = props.payableId;
		this.payable = props.payable;
		this.value = props.value;
		this.paymentMethod = props.paymentMethod;
		this.description = props.description;
		this.cardCVV = props.card.CVV;
		this.cardExpirationDate = props.card.expirationDate;
		this.cardNumber = props.card.number;
		this.cardOwnerName = props.card.ownerName;
	}

	public static isValidPaymentMethod(paymentMethod: string): boolean {
		return ['debit_card', 'credit_card'].includes(paymentMethod);
	}
}
