import {
	type ArgumentsHost,
	Catch,
	type ExceptionFilter,
	HttpException,
} from '@nestjs/common';
import { type HttpArgumentsHost } from '@nestjs/common/interfaces';

import { BaseExceptionFilter } from './base-exception-filter';

import { ServerError } from '@core/errors/server-error';

import { buildErrorContent } from '.';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	public catch(exception: any, host: ArgumentsHost) {
		const http: HttpArgumentsHost = host.switchToHttp();

		const { response, commonProps } = BaseExceptionFilter.init(http);

		if (exception instanceof ServerError) {
			const { message: content, statusCode: code } = exception;

			return buildErrorContent(response, {
				content,
				code,
				...commonProps,
			});
		}

		if (exception instanceof HttpException) {
			const code: number = exception.getStatus();

			return buildErrorContent(response, {
				content: exception.message,
				code,
				...commonProps,
			});
		}

		return buildErrorContent(response, {
			content: 'Internal Server Error',
			code: 500,
			...commonProps,
		});
	}
}
