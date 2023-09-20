import { ServerError } from '@core/errors/server-error';

export class InvalidTransactionError extends ServerError {
	constructor(message: string, statusCode: number = 400) {
		super(message, statusCode);
	}
}
