import { Module } from '@nestjs/common';
import { DatabaseModule } from 'infra/database/database.module';

import { TransactionModule } from '@modules/transaction/transaction.module';

@Module({
	imports: [DatabaseModule, TransactionModule],
})
export class AppModule {}
