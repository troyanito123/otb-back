import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { DateRangeDto } from './dto/date-range.dto';
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
}
