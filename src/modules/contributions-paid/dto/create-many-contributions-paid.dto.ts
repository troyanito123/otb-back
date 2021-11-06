import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateManyContributionsPaidDto {
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  contributionsId: string;
}
