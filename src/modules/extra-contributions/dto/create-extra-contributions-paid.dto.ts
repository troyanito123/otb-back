import { IsDateString, IsNotEmpty } from 'class-validator';
import { User } from 'src/modules/user/entities/user.entity';
import { ExistsOnDatabase } from 'src/validations/exists-on-database';
import { ExtraContribution } from '../entities/extra-contribution.entity';

export class CreateExtraContributionsPaidDto {
  @IsNotEmpty()
  @ExistsOnDatabase(User)
  userId: number;

  @IsNotEmpty()
  @ExistsOnDatabase(ExtraContribution)
  extraContributionId: number;

  @IsNotEmpty()
  @IsDateString()
  date: Date;
}
