import { Module } from '@nestjs/common';
import { ClientProvider, ClientsModule } from '@nestjs/microservices';
import { KAFKA_CLIENT } from './kafka.constant';
import { kafkaOptionsFactory } from './kafka.config';
import { KafkaService } from './kafka.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: KAFKA_CLIENT,
        inject: [],
        useFactory: async (): Promise<ClientProvider> => kafkaOptionsFactory(),
      },
    ]),
  ],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
