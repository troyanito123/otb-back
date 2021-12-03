import { IsDateString, IsNotEmpty } from 'class-validator';

export class FindByDateCertificationsDto {
  @IsNotEmpty()
  @IsDateString()
  initDate: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate: Date;
}
