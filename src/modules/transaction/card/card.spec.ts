import { Card } from './card';

describe('Card entity', (): void => {
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

	it('should throw when creating a Card with invalid number length', (): void => {
		expect(
			(): Card =>
				new Card({
					CVV: '123',
					number: '4444',
					ownerName: 'John Doe',
					expirationDate: new Date(),
				}),
		).toThrowError('Card number must have 16 digits.');
	});

	it('should create a Card', (): void => {
		const card = new Card({
			CVV: '123',
			number: '4444 5555 6666 7777',
			ownerName: 'John Doe',
			expirationDate: new Date(),
		});

		expect(card.CVV).toBe('123');
		expect(card.number).toBe('7777');
	});
});
