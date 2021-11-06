import { ExistsOnDatabase } from 'src/validations/exists-on-database';
import { Attendence } from '../entities/attendence.entity';

export class FindOneAttendenceDto {
  @ExistsOnDatabase(Attendence)
  id: number;
}
