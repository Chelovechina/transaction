import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TransactionStatus, TransactionType } from '../transaction.types';
import { AbstractEntity } from '../../database/abstract.entity';

@Entity({
  name: 'transaction',
})
export class TransactionEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid', {
    comment: 'Идентификатор тразакции',
    name: 'transaction_id',
  })
  readonly id: string;

  @Column('varchar', {
    comment: 'Идентификатор пользователя, совершающего тразакцию',
    nullable: false,
  })
  userId: string;

  @Column('varchar', {
    comment: 'Сумма тразакции в копейках',
    nullable: false,
  })
  amount: string;

  @Column('enum', {
    comment: 'Тип транзакции',
    name: 'type',
    nullable: false,
    enum: TransactionType,
  })
  type: TransactionType;

  @Column('enum', {
    comment: 'Статус транзакции',
    name: 'status',
    nullable: false,
    enum: TransactionStatus,
    default: TransactionStatus.INPROGRESS,
  })
  status?: TransactionStatus;
}
