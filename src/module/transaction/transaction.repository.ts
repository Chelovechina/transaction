import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { DeepPartial, Repository, SelectQueryBuilder } from 'typeorm';
import { FindTransactionParams, TransactionStatus } from './transaction.types';
import { FindTransactionFilterDto } from './dto/get-transaction-filter.dto';

@Injectable()
export class TransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
  ) {}

  async createTransaction<T extends DeepPartial<TransactionEntity>>(
    entity: T,
  ): Promise<TransactionEntity> {
    return this.transactionRepository.save(entity);
  }

  async updatStatus(id: string, status: TransactionStatus): Promise<void> {
    await this.transactionRepository.update({ id }, { status });
  }

  async findById(id: string): Promise<TransactionEntity | undefined> {
    return this.transactionRepository.findOneBy({ id });
  }

  async findAndCount(
    params: FindTransactionFilterDto,
  ): Promise<{ items: TransactionEntity[]; total: number }> {
    const [items, total] = await this.qb(params).getManyAndCount();
    return { items, total };
  }

  qb(
    params: FindTransactionParams = {},
    alias = 'transaction',
  ): SelectQueryBuilder<TransactionEntity> {
    const { userIds, ids, amounts, type, status, take, skip } = params;
    const query = this.transactionRepository.createQueryBuilder(alias);

    if (userIds?.length) {
      query.andWhere(`${alias}.userId IN (:...userIds)`, { userIds });
    }

    if (ids?.length) {
      query.andWhere(`${alias}.id IN (:...ids)`, { ids });
    }

    if (amounts?.length) {
      query.andWhere(`${alias}.amount IN (:...amounts)`, { amounts });
    }

    if (type) {
      query.andWhere(`${alias}.type = :type`, { type });
    }

    if (status) {
      query.andWhere(`${alias}.status = :status`, { status });
    }

    if (take) {
      query.take(take);
    }

    if (skip) {
      query.take(skip);
    }

    return query;
  }
}
