import { IsDateString, IsEnum, IsNotEmpty } from 'class-validator';
import { User } from 'src/modules/user/entities/user.entity';
import { ExistsOnDatabase } from 'src/validations/exists-on-database';
import { CertificationType } from '../entities/certification.entity';

export class CreateCertificationDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  @IsEnum(CertificationType)
  type: CertificationType;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @ExistsOnDatabase(User)
  userId: number;
}
