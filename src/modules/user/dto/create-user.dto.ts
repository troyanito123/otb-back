import { IsNotEmpty, IsEmail, IsOptional, MinLength } from 'class-validator';

import { ExistsOnDatabase } from '../../../validations/exists-on-database';
import { UniqueOnDatabase } from '../../../validations/unique-on-database';
import { Role } from '../../role/entities/role.entity';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @UniqueOnDatabase(User)
  email: string;

  @IsOptional()
  @MinLength(6)
  password: string;

  @IsOptional()
  identification_number: string;

  @IsNotEmpty()
  address_number: string;

  @IsNotEmpty()
  block_number: string;

  @IsOptional()
  @ExistsOnDatabase(Role)
  roleId: number;
}
