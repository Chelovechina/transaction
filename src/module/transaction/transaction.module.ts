import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionRepository } from './transaction.repository';
import { TransactionController } from './transaction.controller';
import { InternalAccountModule } from 'src/internal/account/account.module';
import { ConfigModule } from '@nestjs/config';
import { KafkaModule } from 'src/config/kafka/kafka.module';
import { TransactionKafkaController } from './transaction.kafka-controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity]),
    InternalAccountModule,
    ConfigModule,
    KafkaModule,
  ],
  providers: [TransactionService, TransactionRepository],
  controllers: [TransactionController, TransactionKafkaController],
})
export class TransactionModule {}
