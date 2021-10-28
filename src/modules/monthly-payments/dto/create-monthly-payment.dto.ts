import { IsNotEmpty } from 'class-validator';

export class CreateMonthlyPaymentDto {
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  month: string;

  @IsNotEmpty()
  year: string;
}
