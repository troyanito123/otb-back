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
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindOneUserDto } from './dto/find-one-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { RoleOptions, Roles } from '../auth/authorization/role.decorator';
import { RolesGuard } from '../auth/authorization/role.guard';
import { FindAllUsersDto } from './dto/find-all-users.dto';
import { FindBlockDto } from './dto/find-block.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(RoleOptions.Admin)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  findAll(@Query() query: FindAllUsersDto) {
    return this.userService.findAll(query);
  }
  @Get('detail/:id')
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  getUserWithDetail(@Param() params: FindOneUserDto) {
    return this.userService.getUserWithDetail(params.id);
  }

  @Get(':id')
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  findOne(@Param() params: FindOneUserDto) {
    return this.userService.findOne(params.id);
  }

  @Get('blocks/:block')
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  findByBlock(@Param() params: FindBlockDto) {
    return this.userService.findByBlock(params.block);
  }

  @Put(':id')
  @Roles(RoleOptions.Admin)
  async update(@Param() params: FindOneUserDto, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(params.id, updateUserDto);
    if (!user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: [`The field name: ${updateUserDto.email} already exists. Choose another!`],
          error: 'Bad request',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  @Delete(':id')
  @Roles(RoleOptions.Admin)
  remove(@Param() params: FindOneUserDto) {
    return this.userService.remove(params.id);
  }
}
