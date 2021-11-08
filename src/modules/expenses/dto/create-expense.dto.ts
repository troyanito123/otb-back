import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateExpenseDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  from_user: string;

  @IsNotEmpty()
  to_user: string;
}
