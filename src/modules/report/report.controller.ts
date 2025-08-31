import { Controller, Post, Body, UseGuards, Get, Query } from '@nestjs/common';
import { ReportService } from './report.service';
import { DateRangeDto } from './dto/date-range.dto';
import { UsersMeetingsMatrixDto } from './dto/users-meetings-matrix.dto';
import { UsersMonthlyPaymentsMatrixDto } from './dto/users-monthly-payments-matrix.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/authorization/role.guard';
import { RoleOptions, Roles } from '../auth/authorization/role.decorator';

@Controller('report')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('sum-incomes')
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  getSumIncomesByDate(@Body() dateRange: DateRangeDto) {
    return this.reportService.getSumIncomesByDate(dateRange);
  }

  @Post('sum-expenses')
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  getSumExpensesByDate(@Body() dateRange: DateRangeDto) {
    return this.reportService.getSumExpensesByDate(dateRange);
  }
  @Post('user-monthlypayments')
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  getUserMonthlyPayments(@Body() body: any) {
    return this.reportService.getUserMonthlyPayments(body);
  }

  @Get('users-meetings-matrix')
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  async getUsersMeetingsMatrix(@Query('year') year: number): Promise<UsersMeetingsMatrixDto> {
    return this.reportService.getUsersMeetingsMatrix(year);
  }

  @Get('users-monthly-payments-matrix')
  @Roles(RoleOptions.Admin, RoleOptions.Supervisor)
  async getUsersMonthlyPaymentsMatrix(
    @Query('year') year: number,
  ): Promise<UsersMonthlyPaymentsMatrixDto> {
    return this.reportService.getUsersMonthlyPaymentsMatrix(year);
  }
}
