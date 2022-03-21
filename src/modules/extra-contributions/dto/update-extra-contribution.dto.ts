import { IsEnum, IsNotEmpty } from 'class-validator';
import { ExtraContributionStatus } from '../entities/extra-contribution.entity';

export class UpdateExtraContributionDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsEnum(ExtraContributionStatus)
  status: ExtraContributionStatus;
}
