import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { type DataSource, type DataSourceOptions } from 'typeorm';

import { DatabaseService } from './database.service';
import { dataSource } from './typeorm/datasource';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useClass: DatabaseService,
			dataSourceFactory: async (
				options?: DataSourceOptions,
			): Promise<DataSource> => {
				if (!options) {
					throw new Error('No DataSource options provided');
				}

				return dataSource.initialize();
			},
		}),
	],
})
export class DatabaseModule {}
