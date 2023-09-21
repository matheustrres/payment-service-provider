import { PayableMapper } from './payable-mapper';

import { Payable } from '@modules/payable/domain/entities/payable-entity';
import { type PgPayable } from '@modules/payable/domain/models/payable-model';
import { calculateFee } from '@modules/transaction/domain/helpers/calc-fee';

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
});
