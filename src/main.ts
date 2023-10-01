import { type INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SpelunkerModule } from 'nestjs-spelunker';

import { setupApp } from './app';
import { setupDocs } from './docs';

import { Env } from '@core/config/env';

import { AppModule } from '@ioC/app.module';

export default (async (): Promise<void> => {
	const app: INestApplication = await NestFactory.create(AppModule, {
		bufferLogs: true,
	});

	setupApp(app);
	setupDocs(app);

	app.listen(Env.APP_PORT);

	console.log(SpelunkerModule.explore(app));
})();
