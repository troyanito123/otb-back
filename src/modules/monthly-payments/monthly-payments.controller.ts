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
import { MonthlyPaymentsService } from './monthly-payments.service';
import { CreateMonthlyPaymentDto } from './dto/create-monthly-payment.dto';
import { UpdateMonthlyPaymentDto } from './dto/update-monthly-payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/authorization/role.guard';
import { RoleOptions, Roles } from '../auth/authorization/role.decorator';
import { FindAllMonthlyPaymentDto } from './dto/findAll-monthly-palyment.dto';
import { FindOneMonthlyPayment } from './dto/find-one-monthly-payment.dto';

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
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  findAll(@Query() query: FindAllMonthlyPaymentDto) {
    return this.monthlyPaymentsService.findAll(query);
  }

  @Get(':id')
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  findOne(@Param() params: FindOneMonthlyPayment) {
    return this.monthlyPaymentsService.findOne(params.id);
  }

  @Put(':id')
  @Roles(RoleOptions.Admin)
  update(
    @Param() params: FindOneMonthlyPayment,
    @Body() updateMonthlyPaymentDto: UpdateMonthlyPaymentDto,
  ) {
    return this.monthlyPaymentsService.update(
      params.id,
      updateMonthlyPaymentDto,
    );
  }

  @Delete(':id')
  @Roles(RoleOptions.Admin)
  remove(@Param() params: FindOneMonthlyPayment) {
    return this.monthlyPaymentsService.remove(params.id);
  }
}
