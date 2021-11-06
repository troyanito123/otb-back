import { IsDateString, IsNotEmpty } from 'class-validator';
import { MonthlyPayment } from 'src/modules/monthly-payments/entities/monthly-payment.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { ExistsOnDatabase } from 'src/validations/exists-on-database';

export class CreateMonthlyPaymentMadeDto {
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @ExistsOnDatabase(MonthlyPayment)
  monthlyPaymentId: number;

  @IsNotEmpty()
  @ExistsOnDatabase(User)
  userId: number;
}
