import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordEncrypter } from 'src/utils/password-encrypter';
import { Repository } from 'typeorm';
import { RoleCode, RoleService } from '../role/role.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserStatus } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private roleService: RoleService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    if (createUserDto.roleId) {
      newUser.role = await this.roleService.findOne(createUserDto.roleId);
    }
    newUser.role = await this.roleService.findByCode(RoleCode.USER);
    if (createUserDto.password) {
      newUser.password = PasswordEncrypter.encrypt(createUserDto.password);
    }

    const { password, ...data } = await this.userRepository.save(newUser);
    return { ...data, role: data.role.code };
  }

  async findAll() {
    const users = await this.userRepository.find({
      select: [
        'id',
        'name',
        'identification_number',
        'email',
        'status',
        'address_number',
        'block_number',
      ],
      relations: ['role'],
      order: { name: 'ASC' },
    });

    return users.map((u) => ({ ...u, role: u.role.code }));
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: [
        'id',
        'name',
        'identification_number',
        'email',
        'status',
        'address_number',
        'block_number',
      ],
      relations: ['role'],
    });

    const { role, ...rest } = user;

    const obj = rest as any;
    obj.role = user.role.code;
    return obj;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    this.userRepository.merge(user, updateUserDto);
    user.role = await this.roleService.findOne(updateUserDto.roleId);
    try {
      const newUser = await this.userRepository.save(user);
      return { ...newUser, role: newUser.role.code };
    } catch (error) {
      return null;
    }
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne(id, { relations: ['role'] });
    user.status = UserStatus.DELETE;
    const { password, ...rest } = await this.userRepository.save(user);
    return { ...rest, role: user.role.code };
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email, status: UserStatus.ACTIVE },
      relations: ['role'],
    });
  }
}
