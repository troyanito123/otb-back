import { Meeting } from 'src/modules/meetings/entities/meeting.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { ExistsOnDatabase } from 'src/validations/exists-on-database';

export class FindAttendenceBymeeting {
  @ExistsOnDatabase(Meeting)
  id: number;
}
