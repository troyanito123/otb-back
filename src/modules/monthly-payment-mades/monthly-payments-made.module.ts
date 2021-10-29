import { Module } from '@nestjs/common';
import { MonthlyPaymentsMadeService } from './monthly-payments-made.service';
import { MonthlyPaymentsMadeController } from './monthly-payments-made.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonthlyPaymentMade } from './entities/monthly-payment-made.entity';
import { MonthlyPayment } from '../monthly-payments/entities/monthly-payment.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MonthlyPaymentMade, MonthlyPayment, User]),
  ],
  controllers: [MonthlyPaymentsMadeController],
  providers: [MonthlyPaymentsMadeService],
})
export class MonthlyPaymentMadesModule {}
