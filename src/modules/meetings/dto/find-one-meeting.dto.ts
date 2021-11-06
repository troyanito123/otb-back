import { ExistsOnDatabase } from 'src/validations/exists-on-database';
import { Meeting } from '../entities/meeting.entity';

export class FindOneMeetingDto {
  @ExistsOnDatabase(Meeting)
  id: number;
}
