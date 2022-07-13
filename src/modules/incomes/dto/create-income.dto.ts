import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateIncomeDto {
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  collector: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  userId: number;
}
