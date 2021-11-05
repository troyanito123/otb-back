import { ExistsOnDatabase } from 'src/validations/exists-on-database';
import { Certification } from '../entities/certification.entity';

export class FindOneCertificationDto {
  @ExistsOnDatabase(Certification)
  id: number;
}
