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
import { MonthlyPaymentsMadeService } from './monthly-payments-made.service';
import { CreateMonthlyPaymentMadeDto } from './dto/create-monthly-payment-made.dto';
import { UpdateMonthlyPaymentMadeDto } from './dto/update-monthly-payment-made.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/authorization/role.guard';
import { RoleOptions, Roles } from '../auth/authorization/role.decorator';
import { FindByUser } from './dto/find-by-user.dto';
import { FindOneDto } from './dto/find-one-dto';
import { CreateManyPaymentsDto } from './dto/create-many-payments.dto';
import { FindByDateMonthlyPaymentsMadeDto } from './dto/find-by-date-monthly-payments-made.dto';

@Controller('monthly-payments-made')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MonthlyPaymentsMadeController {
  constructor(
    private readonly monthlyPaymentMadesService: MonthlyPaymentsMadeService,
  ) {}

  @Post()
  @Roles(RoleOptions.Admin)
  create(@Body() createMonthlyPaymentMadeDto: CreateMonthlyPaymentMadeDto) {
    return this.monthlyPaymentMadesService.create(createMonthlyPaymentMadeDto);
  }

  @Post('many')
  @Roles(RoleOptions.Admin)
  createMany(@Body() createManyPaymentsDto: CreateManyPaymentsDto) {
    return this.monthlyPaymentMadesService.createMany(createManyPaymentsDto);
  }

  @Post('bydate')
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  findByDateRange(@Body() findByDateDto: FindByDateMonthlyPaymentsMadeDto) {
    return this.monthlyPaymentMadesService.findByDateRange(findByDateDto);
  }

  @Get()
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  findAll() {
    return this.monthlyPaymentMadesService.findAll();
  }

  @Get('user/:id')
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  findByUser(@Param() params: FindByUser, @Query() query: { year: string }) {
    return this.monthlyPaymentMadesService.findByUser(params.id, query.year);
  }
  @Get('user/report/:id')
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  reportByUser(@Param() params: FindByUser) {
    return this.monthlyPaymentMadesService.reportByUser(params.id);
  }
  @Get('block/report/:code')
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  reportByBlok(@Param() params: any) {
    return this.monthlyPaymentMadesService.reportByBlok(params.code);
  }

  @Get('total-amount')
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  getSumAmount() {
    return this.monthlyPaymentMadesService.getSumAmount();
  }

  @Get(':id')
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  findOne(@Param() params: FindOneDto) {
    return this.monthlyPaymentMadesService.findOne(params.id);
  }

  @Put(':id')
  @Roles(RoleOptions.Admin)
  update(
    @Param() params: FindOneDto,
    @Body() updateMonthlyPaymentMadeDto: UpdateMonthlyPaymentMadeDto,
  ) {
    return this.monthlyPaymentMadesService.update(
      params.id,
      updateMonthlyPaymentMadeDto,
    );
  }

  @Delete(':id')
  @Roles(RoleOptions.Admin)
  remove(@Param('id') id: string) {
    return this.monthlyPaymentMadesService.remove(+id);
  }
}
