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
import { FinesService } from './fines.service';
import { CreateFineDto } from './dto/create-fine.dto';
import { UpdateFineDto } from './dto/update-fine.dto';
import { FindOneFineDto } from './dto/find-one-fine.dto';
import { FindByuserFineDto } from './dto/find-byuser-fine.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/authorization/role.guard';
import { RoleOptions, Roles } from '../auth/authorization/role.decorator';
import { CreateManyFinesDto } from './dto/create-many-fines.dto';
import { FindByDateFinesDto } from './dto/find-by-date-fines.dto';

@Controller('fines')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FinesController {
  constructor(private readonly finesService: FinesService) {}

  @Post()
  @Roles(RoleOptions.Admin)
  create(@Body() createFineDto: CreateFineDto) {
    return this.finesService.create(createFineDto);
  }

  @Post('many')
  @Roles(RoleOptions.Admin)
  createMany(@Body() createManyFinesDto: CreateManyFinesDto) {
    return this.finesService.createMany(createManyFinesDto);
  }

  @Get('total-amount')
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  getSumAmount() {
    return this.finesService.getSumAmount();
  }

  @Get('meetings-user/:id')
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  getCompleteFinesByUser(@Param() params: FindByuserFineDto) {
    return this.finesService.getCompleteFinesByUser(params.id);
  }

  @Post('bydate')
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  findByDateRange(@Body() findByDateDto: FindByDateFinesDto) {
    return this.finesService.findByDateRange(findByDateDto);
  }

  @Get()
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  findAll() {
    return this.finesService.findAll();
  }

  @Get('user/:id')
  findByUser(@Param() params: FindByuserFineDto) {
    return this.finesService.findByUser(params.id);
  }

  @Get(':id')
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  findOne(@Param() params: FindOneFineDto) {
    return this.finesService.findOne(params.id);
  }

  @Put(':id')
  @Roles(RoleOptions.Admin)
  update(
    @Param() params: FindOneFineDto,
    @Body() updateFineDto: UpdateFineDto,
  ) {
    return this.finesService.update(params.id, updateFineDto);
  }

  @Delete(':id')
  @Roles(RoleOptions.Admin)
  remove(@Param() params: FindOneFineDto) {
    return this.finesService.remove(params.id);
  }
}
