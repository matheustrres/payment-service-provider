import { type Payable } from '@modules/payable/domain/entities/payable-entity';

export type ListUserPayablesOptions = {
	userId: string;
	status?: string;
};

export abstract class ListUserPayablesRepository {
	public abstract listUserPayables(
		options: ListUserPayablesOptions,
	): Promise<Payable[] | null>;
}
