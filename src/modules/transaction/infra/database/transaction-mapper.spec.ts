import { TransactionMapper } from './transaction-mapper';
import { PgTransaction } from './transaction-model';

import { Transaction } from '@modules/transaction/domain/entities/transaction-entity';

import { makeTransaction } from '@tests/factories/transaction';
import { makeUser } from '@tests/factories/user';

describe('Transaction mapper', (): void => {
	describe('.toDomain', (): void => {
		it('should convert PgTransaction to Transaction', (): void => {
			const user = makeUser();

			const pgTransaction: PgTransaction = {
				id: 'random_pg_transaction_id',
				value: '599.99',
				cardCVV: '123',
				cardExpirationDate: new Date(),
				cardNumber: '4444',
				cardOwnerName: 'John Doe',
				paymentMethod: 'credit_card',
				userId: user.id,
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
					password: user.password,
					createdAt: user.createdAt,
					transactions: [],
					payables: [],
					updatedAt: user.updatedAt,
				},
				createdAt: new Date(),
			};

			const domainTransaction = TransactionMapper.toDomain(pgTransaction);

			expect(domainTransaction).toBeDefined();
			expect(domainTransaction).toBeInstanceOf(Transaction);
			expect(domainTransaction.id).toEqual(pgTransaction.id);
			expect(domainTransaction.createdAt).toEqual(pgTransaction.createdAt);
		});
	});

	describe('.toPersistence', (): void => {
		it('should convert Transaction to PgTransaction', (): void => {
			const domainTransaction = makeTransaction();

			const pgTransaction = TransactionMapper.toPersistence(domainTransaction);

			expect(pgTransaction).toBeDefined();
			expect(pgTransaction).toBeInstanceOf(PgTransaction);
			expect(pgTransaction.id).toEqual(domainTransaction.id);
			expect(pgTransaction.createdAt).toEqual(domainTransaction.createdAt);
		});
	});
});
