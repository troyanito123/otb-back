import { IsNotEmpty } from 'class-validator';

export class CreateContributionDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  amount: number;
}
