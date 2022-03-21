import { IsNotEmpty } from 'class-validator';

export class CreateExtraContributionDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  amount: number;
}
