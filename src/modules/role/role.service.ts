import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

export enum RoleCode {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  create(createRoleDto: CreateRoleDto) {
    const newRole = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(newRole);
  }

  findAll() {
    return this.roleRepository.find();
  }

  findOne(id: number) {
    return this.roleRepository.findOne(id);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleRepository.findOne(id);
    this.roleRepository.merge(role, updateRoleDto);
    try {
      return await this.roleRepository.save(role);
    } catch (error) {
      return null;
    }
  }

  remove(id: number) {
    return `NOT IMPLEMENT: This action removes a #${id} role`;
  }

  findByCode(code: string) {
    return this.roleRepository.findOne({ where: { code } });
  }
}
