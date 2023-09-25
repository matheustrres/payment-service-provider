import { type Response } from 'express';

export type BaseErrorContent = {
	[key: string]: any;
};

type ErrorContent<Content extends BaseErrorContent> = {
	content: Content | Content[] | string;
	code: number;
	timestamp: string;
	endpoint: string;
};

export const buildErrorContent = (
	response: Response,
	{ code, ...rest }: ErrorContent<any>,
) => {
	return response.status(code).json({
		status: 'ERROR',
		...rest,
	});
};
