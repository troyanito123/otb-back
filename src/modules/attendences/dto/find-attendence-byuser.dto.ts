import { User } from 'src/modules/user/entities/user.entity';
import { ExistsOnDatabase } from 'src/validations/exists-on-database';

export class FindAttendenceByuser {
  @ExistsOnDatabase(User)
  id: number;
}
