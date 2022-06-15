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
import { ContributionsService } from './contributions.service';
import { CreateContributionDto } from './dto/create-contribution.dto';
import { FindOneContributionDto } from './dto/find-one-contribution.dto';
import { UpdateContributionDto } from './dto/update-contribution.dto';

@Controller('contributions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContributionsController {
  constructor(private readonly contributionsService: ContributionsService) {}

  @Post()
  @Roles(RoleOptions.Admin)
  create(@Body() createContributionDto: CreateContributionDto) {
    return this.contributionsService.create(createContributionDto);
  }

  @Get()
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  findAll() {
    return this.contributionsService.findAll();
  }

  @Get(':id')
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  findOne(@Param() params: FindOneContributionDto) {
    return this.contributionsService.findOne(params.id);
  }

  @Put(':id')
  @Roles(RoleOptions.Admin)
  update(
    @Param() params: FindOneContributionDto,
    @Body() updateContributionDto: UpdateContributionDto,
  ) {
    return this.contributionsService.update(params.id, updateContributionDto);
  }

  @Delete(':id')
  @Roles(RoleOptions.Admin)
  remove(@Param() params: FindOneContributionDto) {
    return this.contributionsService.remove(params.id);
  }
}
