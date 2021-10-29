import { ExistsOnDatabase } from 'src/validations/exists-on-database';
import { MonthlyPaymentMade } from '../entities/monthly-payment-made.entity';

export class FindOneDto {
  @ExistsOnDatabase(MonthlyPaymentMade)
  id: number;
}
