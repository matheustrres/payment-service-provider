type Transaction = {
	id: string;
	userId: string;
	payableId?: string;
	value: string;
	paymentMethod: string;
	description?: string;
	cardCVV: string;
	cardExpirationDate: Date;
	cardOwnerName: string;
	cardNumber: string;
};

export class TransactionCreatedEvent {
	public readonly id: string;
	public readonly userId: string;
	public readonly payableId?: string;
	public readonly value: string;
	public readonly paymentMethod: string;
	public readonly description?: string;
	public readonly cardCVV: string;
	public readonly cardExpirationDate: Date;
	public readonly cardOwnerName: string;
	public readonly cardNumber: string;

	private constructor(props: Transaction) {
		this.id = props.id;
		this.userId = props.userId;
		this.payableId = props.payableId;
		this.value = props.value;
		this.paymentMethod = props.paymentMethod;
		this.description = props.description;
		this.cardCVV = props.cardCVV;
		this.cardExpirationDate = props.cardExpirationDate;
		this.cardOwnerName = props.cardOwnerName;
		this.cardNumber = props.cardNumber;
	}

	public static create(props: Transaction): TransactionCreatedEvent {
		return new TransactionCreatedEvent(props);
	}
}
