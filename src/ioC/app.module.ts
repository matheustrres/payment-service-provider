import { Module } from '@nestjs/common';
import { DatabaseModule } from 'infra/database/database.module';

import { TransactionModule } from '@modules/transaction/transaction.module';
import { UserModule } from '@modules/user/user.module';

@Module({
	imports: [DatabaseModule, TransactionModule, UserModule],
})
export class AppModule {}
