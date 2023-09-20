import { Card } from './card';

describe('Card', (): void => {
	it('should throw when creating a Card with invalid CVV length', (): void => {
		expect(
			(): Card =>
				new Card({
					CVV: '123456',
					number: '1243',
					ownerName: 'John Doe',
					expirationDate: new Date(),
				}),
		).toThrowError('Card CVV must have 3 digits.');
	});

	it('should return false when trying to create a card with invalid number length', (): void => {
		expect(Card.validateCardNumberLength('4444')).toBe(false);
	});

	it('should create a Card', (): void => {
		const card = new Card({
			CVV: '123',
			number: '4444555566667777',
			ownerName: 'John Doe',
			expirationDate: new Date(),
		});

		expect(card.CVV).toBe('123');
		expect(card.number).toBe('7777');
	});
});
