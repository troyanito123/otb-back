import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';
export class UpdateMonthlyPaymentMadeDto {
  @IsNotEmpty()
  @IsNumberString()
  amount: number;
}
