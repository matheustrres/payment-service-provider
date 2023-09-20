import {
	type ArgumentsHost,
	Catch,
	type ExceptionFilter,
	HttpException,
} from '@nestjs/common';
import { type HttpArgumentsHost } from '@nestjs/common/interfaces';
import { type Request, type Response } from 'express';

import { ServerError } from '@core/errors/server-error';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	public catch(exception: any, host: ArgumentsHost) {
		const http: HttpArgumentsHost = host.switchToHttp();

		const request = http.getRequest() as Request;
		const response = http.getResponse() as Response;

		const commonProps = {
			timestamp: new Date().toISOString(),
			endpoint: `${request.method} ${request.path}`,
		};

		if (exception instanceof ServerError) {
			const { message, statusCode: code } = exception;

			return buildErrorContent(response, {
				message,
				code,
				...commonProps,
			});
		}

		if (exception instanceof HttpException) {
			const code = exception.getStatus();

			return buildErrorContent(response, {
				message: exception.message,
				code,
				...commonProps,
			});
		}

		return buildErrorContent(response, {
			message: 'Internal Server Error',
			code: 500,
			...commonProps,
		});
	}
}

type ErrorContent = {
	message: string;
	code: number;
	timestamp: string;
	endpoint: string;
};

const buildErrorContent = (response: Response, errorContent: ErrorContent) => {
	return response.status(errorContent.code).json({
		status: 'ERROR',
		...errorContent,
	});
};
