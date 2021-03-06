import {
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsOptional,
  MinLength,
} from 'class-validator';

import { ExistsOnDatabase } from '../../../validations/exists-on-database';
import { Role } from '../../role/entities/role.entity';
import { UserStatus } from '../entities/user.entity';

export class UpdateUserDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  email: string;

  @IsOptional()
  identification_number: string;

  @IsOptional()
  @MinLength(6)
  password: string;

  @IsEnum(UserStatus)
  status: UserStatus;

  @IsNotEmpty()
  address_number: string;

  @IsNotEmpty()
  block_number: string;

  @ExistsOnDatabase(Role)
  roleId: number;
}
