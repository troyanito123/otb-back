import { IsDateString, IsNotEmpty } from 'class-validator';

export class FindByDaterangeDto {
  @IsNotEmpty()
  @IsDateString()
  initDate: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate: Date;
}
