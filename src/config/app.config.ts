import { IsBooleanString, IsEnum, IsString } from 'class-validator';
import { Environment } from './types/configurations.enums';

export class ApplicationConfig {
  @IsEnum(Environment, { always: true })
  NODE_ENV: Environment;

  @IsString({ always: true })
  SERVICE_NAME: string;

  @IsString({ always: true })
  HTTP_HOST: string;

  @IsString({ always: true })
  HTTP_PORT: string;

  @IsString({ always: true })
  HTTP_PREFIX: string;

  @IsString({ always: true })
  HTTP_VERSION: string;

  @IsString({ always: true })
  DB_TYPE: string;

  @IsString({ always: true })
  DB_HOST: string;

  @IsString({ always: true })
  DB_PORT: string;

  @IsString({ always: true })
  DB_DATABASE: string;

  @IsString({ always: true })
  DB_USERNAME: string;

  @IsString({ always: true })
  DB_PASSWORD: string;

  @IsBooleanString({ always: true })
  DB_LOGGING: boolean;

  @IsString({ always: true })
  DB_ENTITIES: string;

  @IsString({ always: true })
  DB_MIGRATIONS: string;

  @IsBooleanString({ always: true })
  DB_MIGRATIONS_RUN: boolean;

  @IsString({ always: true })
  DB_MIGRATIONS_TABLE_NAME: string;
}
