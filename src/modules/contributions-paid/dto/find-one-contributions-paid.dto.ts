import { ExistsOnDatabase } from 'src/validations/exists-on-database';
import { ContributionsPaid } from '../entities/contributions-paid.entity';

export class FindOneContributionsPaidDto {
  @ExistsOnDatabase(ContributionsPaid)
  id: number;
}
