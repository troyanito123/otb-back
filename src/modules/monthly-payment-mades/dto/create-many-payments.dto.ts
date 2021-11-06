import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateManyPaymentsDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  monthsId: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date;
}
