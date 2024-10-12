import { getRepository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import { ConfigOptions } from 'src/config/config';
import { Role } from '../modules/role/entities/role.entity';
import { User, UserStatus } from '../modules/user/entities/user.entity';
import { PasswordEncrypter } from '../utils/password-encrypter';
import { ExpenseCode } from 'src/modules/expenses/entities/expense-code.entity';
import { Expense } from 'src/modules/expenses/entities/expense.entity';

const setDefaultData = async (configService: ConfigService) => {
  const roleRepository = getRepository<Role>(Role);
  const userRepository = getRepository<User>(User);
  const expenseCodeRepository = getRepository<ExpenseCode>(ExpenseCode);
  const expenseRepository = getRepository<Expense>(Expense);

  const expenseCode = await expenseCodeRepository.find();
  if (!expenseCode.length) {
    const [data, count] = await expenseRepository.findAndCount();
    await expenseCodeRepository.save({ currentCode: count + 1 });
  }

  let roleAdmin = await roleRepository
    .createQueryBuilder()
    .where('code = :code', {
      code: 'ADMIN',
    })
    .getOne();

  if (!roleAdmin) {
    const newAdminRole = roleRepository.create({
      name: 'Administrador',
      code: 'ADMIN',
      description: 'Tiene absoluto control sobre la aplicacion',
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
      name: 'Usuario',
      code: 'USER',
      description: 'Usuario mas restringido',
    });
    await roleRepository.save(newRoleUser);
  }

  let roleSupervisor = await roleRepository
    .createQueryBuilder()
    .where('code = :code', {
      code: 'SUPERVISOR',
    })
    .getOne();

  if (!roleSupervisor) {
    const newRoleSupervisor = roleRepository.create({
      name: 'Supervisor',
      code: 'SUPERVISOR',
      description: 'Puede leer todo pero no puedo crear ni actualizar',
    });
    roleSupervisor = await roleRepository.save(newRoleSupervisor);
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
      password: PasswordEncrypter.encrypt(configService.get(ConfigOptions.defaultUserPassword)),
      block_number: '00',
      address_number: '00',
      role: roleAdmin,
      status: UserStatus.ACTIVE,
    });
    await userRepository.save(newuser);
  }
};

export default setDefaultData;
