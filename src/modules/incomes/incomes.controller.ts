import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  Query,
} from '@nestjs/common';
import { IncomesService } from './incomes.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { RolesGuard } from '../auth/authorization/role.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleOptions, Roles } from '../auth/authorization/role.decorator';
import { QueryPageable } from '../queryPageable.dto';

@Controller('incomes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class IncomesController {
  constructor(private readonly incomesService: IncomesService) {}

  @Post()
  @Roles(RoleOptions.Admin)
  create(@Body() createIncomeDto: CreateIncomeDto) {
    return this.incomesService.create(createIncomeDto);
  }

  @Get()
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  findAll() {
    return this.incomesService.findAll();
  }
  @Get('pageable')
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  findAllPageable(@Query() query: QueryPageable) {
    return this.incomesService.findAllPageable(query);
  }

  @Get('byuser/:id')
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  findAllByUser(@Param('id') id: string) {
    return this.incomesService.findAllByUser(+id);
  }

  @Get(':id')
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  findOne(@Param('id') id: string) {
    return this.incomesService.findOne(+id);
  }

  @Put(':id')
  @Roles(RoleOptions.Admin)
  update(@Param('id') id: string, @Body() updateIncomeDto: UpdateIncomeDto) {
    return this.incomesService.update(+id, updateIncomeDto);
  }

  @Delete(':id')
  @Roles(RoleOptions.Admin)
  remove(@Param('id') id: string) {
    return this.incomesService.remove(+id);
  }
}
