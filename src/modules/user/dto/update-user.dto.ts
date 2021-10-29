import { IsNotEmpty, IsEmail, IsEnum } from 'class-validator';

import { ExistsOnDatabase } from '../../../validations/exists-on-database';
import { Role } from '../../role/entities/role.entity';
import { UserStatus } from '../entities/user.entity';

export class UpdateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(UserStatus)
  status: UserStatus;

  @IsNotEmpty()
  address_number: string;

  @IsNotEmpty()
  block_number: string;

  @ExistsOnDatabase(Role)
  roleId: number;
}
