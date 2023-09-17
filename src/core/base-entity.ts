import crypto from 'node:crypto';

export type BaseProps = {
	createdAt: Date | string;
	updatedAt?: Date | string;
};

export class BaseEntity<Props extends BaseProps> {
	private readonly _id: string;
	protected props: Props;

	protected constructor(props: Props, id?: string) {
		this._id = id || crypto.randomUUID();
		this.props = props;
	}

	public get id(): string {
		return this._id;
	}

	public get createdAt(): Date | string {
		return this.props.createdAt;
	}

	public get updatedAt(): Date | string | undefined {
		return this.props.updatedAt;
	}

	protected touch(): void {
		this.props.updatedAt = new Date();
	}
}
