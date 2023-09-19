import { InvalidCardError } from './invalid-card.error';

export type CardProps = {
	CVV: string;
	expirationDate: Date;
	ownerName: string;
	number: string;
};

export class Card {
	private _CVV: string;
	private _expirationDate: Date;
	private _ownerName: string;
	private _number: string;

	public constructor(props: CardProps) {
		if (props.CVV.length > 3)
			throw new InvalidCardError('Card CVV must have 3 digits.');

		this.CVV = props.CVV;
		this.expirationDate = props.expirationDate;
		this.ownerName = props.ownerName;
		this.number = this.getCardNumberLastDigits(
			this.formatCardNumber(props.number),
		);
	}

	public get CVV(): string {
		return this._CVV;
	}

	public set CVV(value: string) {
		this._CVV = value;
	}

	public get expirationDate(): Date {
		return this._expirationDate;
	}

	public set expirationDate(value: Date) {
		this._expirationDate = value;
	}

	public get ownerName(): string {
		return this._ownerName;
	}

	public set ownerName(value: string) {
		this._ownerName = value;
	}

	public get number(): string {
		return this._number;
	}

	public set number(value: string) {
		this._number = value;
	}

	private formatCardNumber(cardNumber: string): string {
		return cardNumber.replace(/\D+/g, '');
	}

	private getCardNumberLastDigits(cardNumber: string): string {
		return cardNumber.slice(-4);
	}

	public validateCardNumberLength(length: number = 16): boolean {
		return this.number.length === length;
	}
}
