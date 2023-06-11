import { IsDateString, IsNotEmpty } from 'class-validator';

export class DateRangeDto {
  @IsNotEmpty()
  @IsDateString()
  initDate: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate: Date;
}
