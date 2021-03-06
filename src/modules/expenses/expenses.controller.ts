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
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/authorization/role.guard';
import { RoleOptions, Roles } from '../auth/authorization/role.decorator';
import { FindOneExpenseDto } from './dto/find-one-expense.dto';
import { FindAllExpensesDto } from './dto/find-all-expenses.dto';
import { FindByDaterangeDto } from './dto/find-by-daterange.dto';

@Controller('expenses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @Roles(RoleOptions.Admin)
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Get()
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  findAll(@Query() query: FindAllExpensesDto) {
    return this.expensesService.findAll(query);
  }

  @Get('total-amount')
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  getSumAmount() {
    return this.expensesService.getSumAmount();
  }

  @Post('bydate')
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  getByDateRange(@Body() findByDateRange: FindByDaterangeDto) {
    return this.expensesService.getByDateRange(findByDateRange);
  }

  @Get(':id')
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  findOne(@Param() params: FindOneExpenseDto) {
    return this.expensesService.findOne(params.id);
  }

  @Put(':id')
  @Roles(RoleOptions.Admin)
  update(
    @Param() params: FindOneExpenseDto,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expensesService.update(params.id, updateExpenseDto);
  }

  @Delete(':id')
  @Roles(RoleOptions.Admin)
  remove(@Param() params: FindOneExpenseDto) {
    return this.expensesService.remove(params.id);
  }
}
