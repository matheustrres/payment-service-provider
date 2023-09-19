import crypto from 'node:crypto';

import { type GetBaseProps } from './helpers/get-base-props';

export class BaseEntity {
	public readonly id: string;
	public readonly createdAt: Date;
	public updatedAt?: Date;

	protected constructor(props: GetBaseProps<BaseEntity>) {
		this.id = props.id || crypto.randomUUID();

		this.createdAt = props.createdAt || new Date();
		this.updatedAt = props.updatedAt;
	}

	protected touch(): void {
		this.updatedAt = new Date();
	}
}
