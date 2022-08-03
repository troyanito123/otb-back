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
import { ExtraContributionsService } from './extra-contributions.service';
import { CreateExtraContributionDto } from './dto/create-extra-contribution.dto';
import { UpdateExtraContributionDto } from './dto/update-extra-contribution.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/authorization/role.guard';
import { RoleOptions, Roles } from '../auth/authorization/role.decorator';
import { FindOneExtraContDto } from './dto/find-one-extra-cont.dto';
import { CreateExtraContributionsPaidDto } from './dto/create-extra-contributions-paid.dto';
import { findByUserDto } from './dto/find-by-user.dto';

@Controller('extra-contributions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ExtraContributionsController {
  constructor(
    private readonly extraContributionsService: ExtraContributionsService,
  ) {}

  @Post()
  @Roles(RoleOptions.Admin)
  create(@Body() createExtraContributionDto: CreateExtraContributionDto) {
    return this.extraContributionsService.create(createExtraContributionDto);
  }

  @Post('payment')
  @Roles(RoleOptions.Admin)
  payExtraContribution(
    @Body() createExtraContributionsPaidDto: CreateExtraContributionsPaidDto,
  ) {
    return this.extraContributionsService.payExtraContribution(
      createExtraContributionsPaidDto,
    );
  }

  @Get('total-amount')
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  getSumAmount() {
    return this.extraContributionsService.getSumAmount();
  }

  @Get()
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  findAll() {
    return this.extraContributionsService.findAll();
  }

  @Get('byuser/:id')
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  findByUser(@Param() params: findByUserDto) {
    return this.extraContributionsService.findByUser(params.id);
  }

  @Get(':id')
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  findOne(@Param() params: FindOneExtraContDto) {
    return this.extraContributionsService.findOne(params.id);
  }

  @Put(':id')
  @Roles(RoleOptions.Admin)
  update(
    @Param() params: FindOneExtraContDto,
    @Body() updateExtraContributionDto: UpdateExtraContributionDto,
  ) {
    return this.extraContributionsService.update(
      params.id,
      updateExtraContributionDto,
    );
  }
}
