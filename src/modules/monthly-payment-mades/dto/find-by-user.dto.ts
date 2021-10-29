import { User } from 'src/modules/user/entities/user.entity';
import { ExistsOnDatabase } from 'src/validations/exists-on-database';

export class FindByUser {
  @ExistsOnDatabase(User)
  id: number;
}
