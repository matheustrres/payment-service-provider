import { type HttpArgumentsHost } from '@nestjs/common/interfaces';
import { type Request, type Response } from 'express';

export class BaseExceptionFilter {
	private constructor(protected readonly http: HttpArgumentsHost) {}

	/**
	 * Must be called before everything else to set it up properly
	 * and to be able to get it's http request and response
	 */
	public static init(http: HttpArgumentsHost): BaseExceptionFilter {
		return new BaseExceptionFilter(http);
	}

	public get request(): Request {
		return this.http.getRequest() as Request;
	}

	public get response(): Response {
		return this.http.getResponse() as Response;
	}

	public get commonProps(): CommonProps {
		return {
			timestamp: new Date().toISOString(),
			endpoint: `${this.request.method} ${this.request.path}`,
		};
	}
}

type CommonProps = {
	readonly timestamp: string;
	readonly endpoint: string;
};
