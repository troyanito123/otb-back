import { IsNotEmpty, IsEmail, IsOptional, MinLength } from 'class-validator';

import { ExistsOnDatabase } from '../../../validations/exists-on-database';
import { UniqueOnDatabase } from '../../../validations/unique-on-database';
import { Role } from '../../role/entities/role.entity';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @UniqueOnDatabase(User)
  email: string;

  @MinLength(6)
  password: string;

  @IsNotEmpty()
  address_number: string;

  @IsNotEmpty()
  block_number: string;

  @IsOptional()
  @ExistsOnDatabase(Role)
  roleId: number;
}
