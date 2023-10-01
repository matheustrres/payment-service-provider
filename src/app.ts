import { type INestApplication } from '@nestjs/common';

import { GlobalExceptionFilter } from '@infra/http/exceptions/global-exception-filter';
import { ZodValidationExceptionFilter } from '@infra/http/exceptions/zod-exception-filter';

export const setupApp = (app: INestApplication): INestApplication => {
	app.useGlobalFilters(
		new GlobalExceptionFilter(),
		new ZodValidationExceptionFilter(),
	);

	app.enableCors({
		origin: true,
		credentials: true,
		methods: 'GET,PUT,PATCH,POST,DELETE',
		allowedHeaders:
			'Content-Type,Accept,Authorization,Access-Control-Allow-Origin',
	});

	app.enableShutdownHooks();

	return app;
};
