import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { FindOneRoleDto } from './dto/find-one-role.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleOptions, Roles } from '../auth/authorization/role.decorator';
import { RolesGuard } from '../auth/authorization/role.guard';

@Controller('role')
@UseGuards(JwtAuthGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @Roles(RoleOptions.Admin)
  @UseGuards(RolesGuard)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @Roles(RoleOptions.Admin)
  @UseGuards(RolesGuard)
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  @Roles(RoleOptions.Admin)
  @UseGuards(RolesGuard)
  findOne(@Param() params: FindOneRoleDto) {
    return this.roleService.findOne(params.id);
  }

  @Put(':id')
  @Roles(RoleOptions.Admin)
  @UseGuards(RolesGuard)
  async update(
    @Param() params: FindOneRoleDto,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    const roleDB = await this.roleService.update(params.id, updateRoleDto);
    if (!roleDB) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: [
            `The field name: ${updateRoleDto.code} already exists. Choose another!`,
          ],
          error: 'Bad request',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return roleDB;
  }

  @Delete(':id')
  @Roles(RoleOptions.Admin)
  @UseGuards(RolesGuard)
  remove(@Param() params: FindOneRoleDto) {
    return this.roleService.remove(params.id);
  }
}
