import { Injectable } from '@nestjs/common';
import {
	type TypeOrmModuleOptions,
	type TypeOrmOptionsFactory,
} from '@nestjs/typeorm';

import { dataSource } from './typeorm/datasource';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
	public createTypeOrmOptions(): TypeOrmModuleOptions {
		return dataSource.options;
	}
}
