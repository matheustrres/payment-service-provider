import { type Response } from 'express';

export type ApiHttpResponse<T> = Response<{
	[key: string]: T;
}>;
