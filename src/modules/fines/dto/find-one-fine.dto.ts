import { ExistsOnDatabase } from 'src/validations/exists-on-database';
import { Fine } from '../entities/fine.entity';

export class FindOneFineDto {
  @ExistsOnDatabase(Fine)
  id: number;
}
