import { Module } from '@nestjs/common';
import { MonthlyPaymentsService } from './monthly-payments.service';
import { MonthlyPaymentsController } from './monthly-payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonthlyPayment } from './entities/monthly-payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MonthlyPayment])],
  controllers: [MonthlyPaymentsController],
  providers: [MonthlyPaymentsService],
})
export class MonthlyPaymentsModule {}
