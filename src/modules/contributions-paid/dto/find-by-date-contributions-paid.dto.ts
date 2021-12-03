import { IsDateString, IsNotEmpty } from 'class-validator';

export class FindByDateContributionPaidDto {
  @IsNotEmpty()
  @IsDateString()
  initDate: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate: Date;
}
