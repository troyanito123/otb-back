import { User } from 'src/modules/user/entities/user.entity';
import { ExistsOnDatabase } from 'src/validations/exists-on-database';

export class FindByuserCertificationDto {
  @ExistsOnDatabase(User)
  id: number;
}
