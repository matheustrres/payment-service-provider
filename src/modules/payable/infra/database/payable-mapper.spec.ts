import { PayableMapper } from './payable-mapper';
import { PgPayable } from './payable-model';

import { Payable } from '@modules/payable/domain/entities/payable-entity';
import { calculateFee } from '@modules/transaction/domain/helpers/calc-fee';

import { makePayable } from '@tests/factories/payable';
import { makeTransaction } from '@tests/factories/transaction';

describe('Payable mapper', (): void => {
	describe('.toDomain', (): void => {
		it('should convert PgPayable to Payable', (): void => {
			const transaction = makeTransaction();

			const pgPayable: PgPayable = {
				id: 'random_pg_payable_id',
				fee: calculateFee(transaction).toString(),
				transactionId: transaction.id,
				status: 'waiting_funds',
				paymentDate: new Date(),
				createdAt: new Date(),
			};

			const domainPayable = PayableMapper.toDomain(pgPayable);

			expect(domainPayable).toBeDefined();
			expect(domainPayable).toBeInstanceOf(Payable);
			expect(domainPayable.id).toEqual(pgPayable.id);
			expect(domainPayable.createdAt).toEqual(pgPayable.createdAt);
		});
	});

	describe('.toPersistence', (): void => {
		it('should convert Payable to PgPayable', (): void => {
			const domainPayable = makePayable();

			const pgPayable = PayableMapper.toPersistence(domainPayable);

			expect(pgPayable).toBeDefined();
			expect(pgPayable).toBeInstanceOf(PgPayable);
			expect(pgPayable.id).toEqual(domainPayable.id);
			expect(pgPayable.createdAt).toEqual(domainPayable.createdAt);
		});
	});
});
