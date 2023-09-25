import {
	type ArgumentsHost,
	Catch,
	type ExceptionFilter,
} from '@nestjs/common';
import { type HttpArgumentsHost } from '@nestjs/common/interfaces';
import { ZodValidationException } from 'nestjs-zod';
import { type ZodIssue, type ZodError } from 'zod';

import { BaseExceptionFilter } from './base-exception-filter';

import { buildErrorContent } from '.';

@Catch(ZodValidationException)
export class ZodValidationExceptionFilter implements ExceptionFilter {
	public catch(exception: ZodValidationException, host: ArgumentsHost) {
		const http: HttpArgumentsHost = host.switchToHttp();

		const { response, commonProps } = BaseExceptionFilter.init(http);

		const error: ZodError = exception.getZodError();

		const issues: Issue[] = error.errors.map(
			(issue: ZodIssue): Issue => ({
				path: issue.path[0] as string,
				message: issue.message,
			}),
		);

		return buildErrorContent(response, {
			code: 400,
			content: issues,
			...commonProps,
		});
	}
}

type Issue = {
	path: string;
	message: string;
};
