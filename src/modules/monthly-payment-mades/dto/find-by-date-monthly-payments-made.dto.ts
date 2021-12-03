import { IsDateString, IsNotEmpty } from 'class-validator';

export class FindByDateMonthlyPaymentsMadeDto {
  @IsNotEmpty()
  @IsDateString()
  initDate: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate: Date;
}
