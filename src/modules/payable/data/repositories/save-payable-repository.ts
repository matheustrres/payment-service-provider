import { type Payable } from '@modules/payable/domain/entities/payable-entity';

export abstract class SavePayableRepository {
	public abstract savePayable(payable: Payable): Promise<void>;
}
