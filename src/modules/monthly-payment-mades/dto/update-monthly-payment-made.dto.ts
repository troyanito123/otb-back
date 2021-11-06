import { IsDateString, IsNotEmpty, IsNumberString } from 'class-validator';
export class UpdateMonthlyPaymentMadeDto {
  @IsNotEmpty()
  @IsNumberString()
  amount: number;

  @IsNotEmpty()
  @IsDateString()
  date: Date;
}
