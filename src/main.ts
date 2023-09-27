import { type INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SpelunkerModule } from 'nestjs-spelunker';

import { GlobalExceptionFilter } from '@infra/http/exceptions/global-exception-filter';
import { ZodValidationExceptionFilter } from '@infra/http/exceptions/zod-exception-filter';

import { AppModule } from '@ioC/app.module';

export default (async (): Promise<void> => {
	const app: INestApplication = await NestFactory.create(AppModule, {
		bufferLogs: true,
	});

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

	app.listen(3000);

	console.log(SpelunkerModule.explore(app));
})();
