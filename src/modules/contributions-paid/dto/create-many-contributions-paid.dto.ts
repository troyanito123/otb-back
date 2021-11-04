import { IsNotEmpty } from 'class-validator';

export class CreateManyContributionsPaidDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  contributionsId: string;
}
