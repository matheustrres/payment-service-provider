import { type Payable } from '@modules/payable/domain/entities/payable-entity';

export abstract class CreatePayableRepository {
	public abstract create(payable: Payable): Promise<void>;
}
