export class ServerError extends Error {
	public readonly message: string;
	public readonly statusCode: number;

	constructor(message: string, statusCode: number = 500) {
		super(message);

		this.message = message;
		this.statusCode = statusCode;

		Error.captureStackTrace(this, this.constructor);
	}
}
