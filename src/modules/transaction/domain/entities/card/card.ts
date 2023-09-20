import { InvalidCardError } from './invalid-card.error';

export type CardProps = {
	CVV: string;
	expirationDate: Date;
	ownerName: string;
	number: string;
};

export class Card {
	public CVV: string;
	public expirationDate: Date;
	public ownerName: string;
	public number: string;

	public constructor(props: CardProps) {
		props.number = this.formatCardNumber(props.number);

		if (props.CVV.length !== 3)
			throw new InvalidCardError('Card CVV must have 3 digits.');

		this.CVV = props.CVV;
		this.expirationDate = props.expirationDate;
		this.ownerName = props.ownerName;
		this.number = this.getCardNumberLastDigits(props.number);
	}

	private formatCardNumber(cardNumber: string): string {
		return cardNumber.replace(/\D+/g, '');
	}

	private getCardNumberLastDigits(cardNumber: string): string {
		return cardNumber.slice(-4);
	}

	public static validateCardNumberLength(
		cardNumber: string,
		length: number = 16,
	): boolean {
		return cardNumber.length === length;
	}
}
