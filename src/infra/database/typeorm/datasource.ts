import path from 'node:path';

import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
	type: 'postgres',
	host: process.env.TYPEORM_CONN_HOST,
	database: process.env.TYPEORM_CONN_DATABASE,
	port: process.env.TYPEORM_CONN_PORT,
	username: process.env.TYPEORM_CONN_USERNAME,
	password: process.env.TYPEORM_CONN_PASSWORD,
	entities: [
		path.join(__dirname, '../../..', process.env.TYPEORM_ENTITIES_PATH),
	],
	migrations: [
		path.join(__dirname, '../../..', process.env.TYPEORM_MIGRATIONS_PATH),
	],
	synchronize: false,
	logging: true,
});
