import { Card } from './card';

describe('Card entity', (): void => {
	it('should throw when creating a Card with invalid CVV length', (): void => {
		expect(
			(): Card =>
				new Card({
					CVV: '123456',
					number: '4444',
					ownerName: 'John Doe',
					expirationDate: new Date(),
				}),
		).toThrowError('Card CVV must have 3 digits.');
	});
});
