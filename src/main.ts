import {
	ValidationPipe,
	type INestApplication,
	HttpException,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { type ValidationError } from 'class-validator';
import { SpelunkerModule } from 'nestjs-spelunker';

import { GlobalExceptionFilter } from '@infra/http/exceptions/global-exception-filter';
import { DtoValidator } from '@infra/http/validators/dto-validator';

import { AppModule } from '@ioC/app.module';

export default (async (): Promise<void> => {
	const app: INestApplication = await NestFactory.create(AppModule);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
			exceptionFactory: (errors: ValidationError[]): HttpException =>
				new HttpException(
					DtoValidator.extractConstraints(errors).join(','),
					400,
				),
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
