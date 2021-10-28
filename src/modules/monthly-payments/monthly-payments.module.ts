import { Module } from '@nestjs/common';
import { MonthlyPaymentsService } from './monthly-payments.service';
import { MonthlyPaymentsController } from './monthly-payments.controller';

@Module({
  controllers: [MonthlyPaymentsController],
  providers: [MonthlyPaymentsService]
})
export class MonthlyPaymentsModule {}
