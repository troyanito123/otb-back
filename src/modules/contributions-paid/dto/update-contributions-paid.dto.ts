import { IsNotEmpty } from 'class-validator';
export class UpdateContributionsPaidDto {
  @IsNotEmpty()
  amount: number;
}
