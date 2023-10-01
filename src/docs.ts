import { type INestApplication } from '@nestjs/common';
import {
	DocumentBuilder,
	type OpenAPIObject,
	SwaggerModule,
} from '@nestjs/swagger';

export const setupDocs = (app: INestApplication): void => {
	const docBuilder: DocumentBuilder = new DocumentBuilder()
		.setTitle('Payment Service Provider')
		.setDescription(
			'A super-simplified version of a Payment Service Provider (PSP) like Pagar.me',
		)
		.setVersion('1.0.0')
		.addTag('users')
		.addTag('transactions')
		.addTag('payables');

	const openAPIObject: OpenAPIObject = SwaggerModule.createDocument(
		app,
		docBuilder.build(),
	);

	SwaggerModule.setup('api', app, openAPIObject);
};
