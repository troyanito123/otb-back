import { ExistsOnDatabase } from 'src/validations/exists-on-database';
import { Contribution } from '../entities/contribution.entity';

export class FindOneContributionDto {
  @ExistsOnDatabase(Contribution)
  id: number;
}
