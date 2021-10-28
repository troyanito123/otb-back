import { getRepository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import { ConfigOptions } from 'src/config/config';
import { Role } from '../modules/role/entities/role.entity';
import { User } from '../modules/user/entities/user.entity';
import { PasswordEncrypter } from '../utils/password-encrypter';

const setDefaultData = async (configService: ConfigService) => {
  const roleRepository = getRepository<Role>(Role);
  const userRepository = getRepository<User>(User);

  let roleAdmin = await roleRepository
    .createQueryBuilder()
    .where('code = :code', {
      code: 'ADMIN',
    })
    .getOne();

  if (!roleAdmin) {
    const newAdminRole = roleRepository.create({
      name: 'Administrator',
      code: 'ADMIN',
      description: 'Can do anything',
    });
    roleAdmin = await roleRepository.save(newAdminRole);
  }

  const roleUser = await roleRepository
    .createQueryBuilder()
    .where('code = :code', {
      code: 'USER',
    })
    .getOne();

  if (!roleUser) {
    const newRoleUser = roleRepository.create({
      name: 'Usuer',
      code: 'USER',
      description: 'can not create users',
    });
    await roleRepository.save(newRoleUser);
  }

  const user = await userRepository
    .createQueryBuilder()
    .where('email = :email', {
      email: configService.get(ConfigOptions.defaultUserEmail),
    })
    .getOne();

  if (!user) {
    const newuser = userRepository.create({
      name: configService.get(ConfigOptions.defaultUserName),
      email: configService.get(ConfigOptions.defaultUserEmail),
      password: PasswordEncrypter.encrypt(
        configService.get(ConfigOptions.defaultUserPassword),
      ),
      role: roleAdmin,
    });
    await userRepository.save(newuser);
  }
};

export default setDefaultData;
