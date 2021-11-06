import { IsDateString, IsNotEmpty } from 'class-validator';
import { Contribution } from 'src/modules/contributions/entities/contribution.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { ExistsOnDatabase } from 'src/validations/exists-on-database';

export class CreateContributionsPaidDto {
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @ExistsOnDatabase(User)
  userId: number;

  @IsNotEmpty()
  @ExistsOnDatabase(Contribution)
  contributionId: number;
}
