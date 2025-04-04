import { Injectable } from '@nestjs/common';
import { TransactionRepository } from './transaction.repository';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import {
  BalanceChangedStatus,
  EventBalanceChangedData,
  EventNameEnum,
  EventTransactionSavedData,
  TransactionStatus,
  TransactionType,
} from './transaction.types';
import { TransactionDto } from './dto/transaction.dto';
import { FindTransactionFilterDto } from './dto/get-transaction-filter.dto';
import { KafkaService } from '../../config/kafka/kafka.service';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly kafkaService: KafkaService,
  ) {}

  async create(params: CreateTransactionDto): Promise<void> {
    const { userId, amount, transactionType, recipient } = params;

    if (transactionType === TransactionType.TRANSFER && recipient) {
      return this.createTransferTransaction(params);
    }

    const transaction = await this.transactionRepository.createTransaction({
      userId,
      amount,
      type: transactionType,
    });

    const data: EventTransactionSavedData = {
      userId,
      amount,
      transactionType,
      transactionId: transaction.id,
    };

    this.kafkaService.produce({
      eventName: EventNameEnum.TransactionSaved,
      data,
    });
  }

  async createTransferTransaction(params: CreateTransactionDto): Promise<void> {
    const { userId, amount, transactionType, recipient } = params;

    const transactionWithdrawl =
      await this.transactionRepository.createTransaction({
        userId,
        amount: `-${amount}`,
        type: transactionType,
      });

    const dataWithdrawl: EventTransactionSavedData = {
      userId,
      amount,
      transactionId: transactionWithdrawl.id,
      transactionType: TransactionType.WITHDRAWL,
    };

    this.kafkaService.produce({
      eventName: EventNameEnum.TransactionSaved,
      data: dataWithdrawl,
    });

    const transactionDeposit =
      await this.transactionRepository.createTransaction({
        userId: recipient,
        amount: amount,
        type: transactionType,
      });

    const dataDeposit: EventTransactionSavedData = {
      userId: recipient,
      amount,
      transactionId: transactionDeposit.id,
      transactionType: TransactionType.DEPOSIT,
    };

    this.kafkaService.produce({
      eventName: EventNameEnum.TransactionSaved,
      data: dataDeposit,
    });
  }

  async updateStatus(params: EventBalanceChangedData): Promise<void> {
    const { transactionId, status } = params;
    let transactionStatus = TransactionStatus.COMPLETED;

    if (status === BalanceChangedStatus.FAILED) {
      transactionStatus = TransactionStatus.FAILED;
    }

    await this.transactionRepository.updatStatus(
      transactionId,
      transactionStatus,
    );
  }

  async getTransaction(id: string): Promise<TransactionDto> {
    return this.transactionRepository.findById(id);
  }

  async getTransactions(
    params: FindTransactionFilterDto,
  ): Promise<{ items: TransactionDto[]; total: number }> {
    return this.transactionRepository.findAndCount(params);
  }
}
