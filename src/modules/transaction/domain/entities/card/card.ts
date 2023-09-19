import { InvalidCardError } from './invalid-card.error';

export type CardProps = {
	CVV: string;
	expirationDate: Date;
	ownerName: string;
	number: string;
};

export class Card {
	public readonly CVV: string;
	public readonly expirationDate: Date;
	public readonly ownerName: string;
	public readonly number: string;

	public constructor(props: CardProps) {
		if (props.CVV.length > 3)
			throw new InvalidCardError('Card CVV must have 3 digits.');

		const cardNumber: string = this.formatCardNumber(props.number);

		if (!this.cardNumberHasValidLength(cardNumber))
			throw new InvalidCardError(`Card number must have 16 digits.`);

		this.CVV = props.CVV;
		this.expirationDate = props.expirationDate;
		this.ownerName = props.ownerName;
		this.number = this.getCardNumberLastDigits(cardNumber);
	}

	private formatCardNumber(cardNumber: string): string {
		return cardNumber.replace(/\D+/g, '');
	}

	private getCardNumberLastDigits(cardNumber: string): string {
		return cardNumber.slice(-4);
	}

	private cardNumberHasValidLength(cardNumber: string): boolean {
		return cardNumber.length === 16;
	}
}
