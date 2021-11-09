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
import { ContributionsPaidService } from './contributions-paid.service';
import { CreateContributionsPaidDto } from './dto/create-contributions-paid.dto';
import { CreateManyContributionsPaidDto } from './dto/create-many-contributions-paid.dto';
import { FindByUserContributionsPaidDto } from './dto/find-byuser-contributions-paid.dto copy';
import { FindOneContributionsPaidDto } from './dto/find-one-contributions-paid.dto';
import { UpdateContributionsPaidDto } from './dto/update-contributions-paid.dto';

@Controller('contributions-paid')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContributionsPaidController {
  constructor(
    private readonly contributionsPaidService: ContributionsPaidService,
  ) {}

  @Post()
  @Roles(RoleOptions.Admin)
  create(@Body() createContributionsPaidDto: CreateContributionsPaidDto) {
    return this.contributionsPaidService.create(createContributionsPaidDto);
  }

  @Post('many')
  @Roles(RoleOptions.Admin)
  createMany(@Body() createMany: CreateManyContributionsPaidDto) {
    return this.contributionsPaidService.createMany(createMany);
  }

  @Get()
  @Roles(RoleOptions.Admin)
  findAll() {
    return this.contributionsPaidService.findAll();
  }

  @Get('user/:id')
  findByUser(@Param() params: FindByUserContributionsPaidDto) {
    return this.contributionsPaidService.findByUser(params.id);
  }

  @Get('total-amount')
  @Roles(RoleOptions.Admin)
  getSumAmount() {
    return this.contributionsPaidService.getSumAmount();
  }

  @Get(':id')
  findOne(@Param() params: FindOneContributionsPaidDto) {
    return this.contributionsPaidService.findOne(params.id);
  }

  @Put(':id')
  @Roles(RoleOptions.Admin)
  update(
    @Param() params: FindOneContributionsPaidDto,
    @Body() updateContributionsPaidDto: UpdateContributionsPaidDto,
  ) {
    return this.contributionsPaidService.update(
      params.id,
      updateContributionsPaidDto,
    );
  }

  @Delete(':id')
  @Roles(RoleOptions.Admin)
  remove(@Param('id') id: string) {
    return this.contributionsPaidService.remove(+id);
  }
}
