export type CardProps = {
	CVV: string;
	expirationDate: Date;
	ownerName: string;
	number: string;
};

export class Card {
	private props: CardProps;

	public constructor(props: CardProps) {
		if (props.CVV.length > 3) {
			throw new Error('Card CVV must have 3 digits.');
		}

		const cardNumber: string = this.formatCardNumber(props.number);

		if (!this.validateCardNumberLength(cardNumber)) {
			throw new Error(`Card number must have 16 digits.`);
		}

		this.props = {
			...props,
			number: this.getLastCardNumberDigits(cardNumber),
		};
	}

	public get CVV(): string {
		return this.props.CVV;
	}

	public get expirationDate(): Date {
		return this.props.expirationDate;
	}

	public get number(): string {
		return this.props.number;
	}

	public get ownerName(): string {
		return this.props.ownerName;
	}

	private formatCardNumber(cardNumber: string): string {
		return cardNumber.replace(/\D+/g, '');
	}

	private getLastCardNumberDigits(cardNumber: string): string {
		return cardNumber.slice(-4);
	}

	private validateCardNumberLength(cardNumber: string): boolean {
		return cardNumber.length === 16;
	}
}
