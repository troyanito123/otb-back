import { Module } from '@nestjs/common';
import { MonthlyPaymentsMadeService } from './monthly-payments-made.service';
import { MonthlyPaymentsMadeController } from './monthly-payments-made.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonthlyPaymentMade } from './entities/monthly-payment-made.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MonthlyPaymentMade])],
  controllers: [MonthlyPaymentsMadeController],
  providers: [MonthlyPaymentsMadeService],
})
export class MonthlyPaymentMadesModule {}
