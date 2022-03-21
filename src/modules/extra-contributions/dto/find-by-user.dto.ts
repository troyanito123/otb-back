import { User } from 'src/modules/user/entities/user.entity';
import { ExistsOnDatabase } from 'src/validations/exists-on-database';

export class findByUserDto {
  @ExistsOnDatabase(User)
  id: number;
}
