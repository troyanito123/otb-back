import { IsDateString, IsNotEmpty } from 'class-validator';
export class UpdateContributionsPaidDto {
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  @IsDateString()
  date: Date;
}
