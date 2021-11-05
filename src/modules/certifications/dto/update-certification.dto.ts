import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsEnum, IsNotEmpty } from 'class-validator';
import { CertificationType } from '../entities/certification.entity';
import { CreateCertificationDto } from './create-certification.dto';

export class UpdateCertificationDto {
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
}
