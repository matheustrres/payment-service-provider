import { ValidationPipe, type INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SpelunkerModule } from 'nestjs-spelunker';

import { GlobalExceptionFilter } from '@infra/http/exceptions/global-exception-filter';

import { AppModule } from '@ioC/app.module';

export default (async (): Promise<void> => {
	const app: INestApplication = await NestFactory.create(AppModule);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
	);

	app.useGlobalFilters(new GlobalExceptionFilter());

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
