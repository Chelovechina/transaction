import { ApiProperty } from '@nestjs/swagger';
import { TransactionStatus, TransactionType } from '../transaction.types';
import { Expose } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';

export class TransactionDto {
  @ApiProperty({
    description: 'Идентификатор транзакции',
    type: String,
  })
  @IsString()
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Идентификатор пользователя',
    type: String,
  })
  @IsString()
  @Expose()
  userId: string;

  @ApiProperty({
    description: 'Сумма в копейках',
    type: String,
  })
  @IsString()
  @Expose()
  amount: string;

  @ApiProperty({
    description: 'Тип тразакции',
    required: false,
    enum: TransactionType,
  })
  @IsEnum(TransactionType)
  @Expose()
  transactionType?: TransactionType;

  @ApiProperty({
    description: 'Статус тразакции',
    required: false,
    enum: TransactionStatus,
  })
  @IsEnum(TransactionStatus)
  @Expose()
  status?: TransactionStatus;
}
