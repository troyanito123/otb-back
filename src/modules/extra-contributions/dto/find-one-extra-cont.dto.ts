import { ExistsOnDatabase } from 'src/validations/exists-on-database';
import { ExtraContribution } from '../entities/extra-contribution.entity';

export class FindOneExtraContDto {
  @ExistsOnDatabase(ExtraContribution)
  id: number;
}
