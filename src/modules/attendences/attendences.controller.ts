import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { RoleOptions, Roles } from '../auth/authorization/role.decorator';
import { RolesGuard } from '../auth/authorization/role.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AttendencesService } from './attendences.service';
import { CreateAttendenceDto } from './dto/create-attendence.dto';
import { FindAttendenceByuser } from './dto/find-attendence-byuser.dto';
import { FindOneAttendenceDto } from './dto/find-one-attendence.dto';
import { UpdateAttendenceDto } from './dto/update-attendence.dto';

@Controller('attendences')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AttendencesController {
  constructor(private readonly attendencesService: AttendencesService) {}

  @Post()
  @Roles(RoleOptions.Admin)
  create(@Body() createAttendenceDto: CreateAttendenceDto) {
    return this.attendencesService.create(createAttendenceDto);
  }

  @Get()
  @Roles(RoleOptions.Admin)
  findAll() {
    return this.attendencesService.findAll();
  }

  @Get()
  @Roles(RoleOptions.Admin)
  findByUser(@Param() params: FindAttendenceByuser) {
    return this.attendencesService.findByUser(params.id);
  }

  @Get(':id')
  findOne(@Param() params: FindOneAttendenceDto) {
    return this.attendencesService.findOne(params.id);
  }

  @Put(':id')
  @Roles(RoleOptions.Admin)
  update(
    @Param() params: FindOneAttendenceDto,
    @Body() updateAttendenceDto: UpdateAttendenceDto,
  ) {
    return this.attendencesService.update(params.id, updateAttendenceDto);
  }

  @Delete(':id')
  @Roles(RoleOptions.Admin)
  remove(@Param() params: FindOneAttendenceDto) {
    return this.attendencesService.remove(params.id);
  }
}
