import { IsDateString, IsNotEmpty } from 'class-validator';

export class FindByDateFinesDto {
  @IsNotEmpty()
  @IsDateString()
  initDate: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate: Date;
}
