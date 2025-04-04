import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TransactionStatus, TransactionType } from '../transaction.types';

export class FindTransactionFilterDto {
  @ApiProperty({
    description: 'Идентификаторы транзакции',
    type: [String],
  })
  @IsString()
  @IsOptional()
  @Expose()
  ids: string[];

  @ApiProperty({
    description: 'Идентификаторы пользователей',
    type: [String],
  })
  @IsString()
  @IsOptional()
  @Expose()
  userIds: string[];

  @ApiProperty({
    description: 'Сумма',
    type: [String],
  })
  @IsString()
  @IsOptional()
  @Expose()
  amount: string[];

  @ApiProperty({
    description: 'Тип транзакции',
    required: false,
    enum: TransactionType,
  })
  @Expose()
  @IsEnum(TransactionType)
  transactionType?: TransactionType;

  @ApiProperty({
    description: 'Статус транзакции',
    required: false,
    enum: TransactionStatus,
  })
  @Expose()
  @IsOptional()
  @IsEnum(TransactionStatus)
  status?: TransactionStatus;

  @ApiProperty({
    description: '',
    type: Number,
    required: false,
    example: 20,
  })
  @IsOptional()
  @IsNumber()
  readonly take?: number;

  @ApiProperty({
    description: '',
    type: Number,
    required: false,
    example: 20,
  })
  @IsOptional()
  @IsNumber()
  readonly skip?: number;
}
