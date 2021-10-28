import { IsNotEmpty } from 'class-validator';
export class UpdateMonthlyPaymentDto {
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  month: string;

  @IsNotEmpty()
  year: string;
}
