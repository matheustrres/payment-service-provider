import { Card, type CardProps } from '@modules/transaction/card/card';

export const makeCard = (override: Partial<CardProps> = {}) =>
	new Card({
		CVV: '123',
		expirationDate: new Date(),
		number: '4444 5555 6666 7777',
		ownerName: 'Adam Smith',
		...override,
	});
