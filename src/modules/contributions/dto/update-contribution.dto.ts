import { IsNotEmpty } from 'class-validator';

export class UpdateContributionDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  amount: number;
}
