import { Module } from '@nestjs/common';
import { CustomersqueueService } from './customersqueue.service';
import { CustomersqueueController } from './customersqueue.controller';

@Module({
  controllers: [CustomersqueueController],
  providers: [CustomersqueueService],
})
export class CustomersqueueModule {}
