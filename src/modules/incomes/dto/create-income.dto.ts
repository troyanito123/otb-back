import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateIncomeDto {
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  userId: number;
}
