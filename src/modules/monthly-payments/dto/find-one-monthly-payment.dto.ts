import { ExistsOnDatabase } from 'src/validations/exists-on-database';
import { MonthlyPayment } from '../entities/monthly-payment.entity';

export class FindOneMonthlyPayment {
  @ExistsOnDatabase(MonthlyPayment)
  id: number;
}
