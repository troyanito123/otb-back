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
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/authorization/role.guard';
import { RoleOptions, Roles } from '../auth/authorization/role.decorator';
import { FindOneExpenseDto } from './dto/find-one-expense.dto';

@Controller('expenses')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RoleOptions.Admin)
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Get()
  findAll() {
    return this.expensesService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneExpenseDto) {
    return this.expensesService.findOne(params.id);
  }

  @Put(':id')
  update(
    @Param() params: FindOneExpenseDto,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expensesService.update(params.id, updateExpenseDto);
  }

  @Delete(':id')
  remove(@Param() params: FindOneExpenseDto) {
    return this.expensesService.remove(params.id);
  }
}
