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
    newUser.password = PasswordEncrypter.encrypt(createUserDto.password);

    const { password, ...data } = await this.userRepository.save(newUser);
    return data;
  }

  async findAll() {
    return this.userRepository.find({
      select: ['email', 'id', 'name', 'status'],
      relations: ['role'],
    });
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'status'],
      relations: ['role'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    this.userRepository.merge(user, updateUserDto);
    user.role = await this.roleService.findOne(updateUserDto.roleId);
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      return null;
    }
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    user.status = UserStatus.DELETE;
    return this.userRepository.save(user);
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email, status: UserStatus.ACTIVE },
      relations: ['role'],
    });
  }
}
