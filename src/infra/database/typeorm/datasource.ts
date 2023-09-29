import path from 'node:path';

import { DataSource } from 'typeorm';

import { Env } from '@core/config/env';

export const dataSource = new DataSource({
	type: 'postgres',
	host: Env.TYPEORM_CONN_HOST,
	database: Env.TYPEORM_CONN_DATABASE,
	port: Env.TYPEORM_CONN_PORT,
	username: Env.TYPEORM_CONN_USERNAME,
	password: Env.TYPEORM_CONN_PASSWORD,
	entities: [path.join(__dirname, '../../..', Env.TYPEORM_ENTITIES_PATH)],
	migrations: [path.join(__dirname, '../../..', Env.TYPEORM_MIGRATIONS_PATH)],
	logging: true,
});
