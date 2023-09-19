import { ServerError } from '@core/errors/server-error';

export class InvalidCardError extends ServerError {
	constructor(message: string, statusCode: number = 400) {
		super(message, statusCode);
	}
}
