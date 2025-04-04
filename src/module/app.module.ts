import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/module/database/database.module';
import { TransactionModule } from './transaction/transaction.module';
import { InternalAccountModule } from 'src/internal/account/account.module';

@Module({
  imports: [
    TransactionModule,
    ConfigModule.forRoot(),
    DatabaseModule,
    InternalAccountModule,
  ],
})
export class AppModule {}
