import { ServerError } from '@core/errors/server-error';

export class InvalidUserError extends ServerError {
	constructor(message: string, statusCode: number = 400) {
		super(message, statusCode);
	}
}
