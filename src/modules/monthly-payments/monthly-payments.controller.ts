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
import { MonthlyPaymentsService } from './monthly-payments.service';
import { CreateMonthlyPaymentDto } from './dto/create-monthly-payment.dto';
import { UpdateMonthlyPaymentDto } from './dto/update-monthly-payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/authorization/role.guard';
import { RoleOptions, Roles } from '../auth/authorization/role.decorator';

@Controller('monthly-payments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MonthlyPaymentsController {
  constructor(
    private readonly monthlyPaymentsService: MonthlyPaymentsService,
  ) {}

  @Post()
  @Roles(RoleOptions.Admin)
  create(@Body() createMonthlyPaymentDto: CreateMonthlyPaymentDto) {
    return this.monthlyPaymentsService.create(createMonthlyPaymentDto);
  }

  @Get()
  findAll() {
    return this.monthlyPaymentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.monthlyPaymentsService.findOne(+id);
  }

  @Put(':id')
  @Roles(RoleOptions.Admin)
  update(
    @Param('id') id: string,
    @Body() updateMonthlyPaymentDto: UpdateMonthlyPaymentDto,
  ) {
    return this.monthlyPaymentsService.update(+id, updateMonthlyPaymentDto);
  }

  @Delete(':id')
  @Roles(RoleOptions.Admin)
  remove(@Param('id') id: string) {
    return this.monthlyPaymentsService.remove(+id);
  }
}
