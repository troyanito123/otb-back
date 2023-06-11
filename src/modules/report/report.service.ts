import { Injectable } from '@nestjs/common';
import { ExpensesService } from '../expenses/expenses.service';
import { MonthlyPaymentsMadeService } from '../monthly-payment-mades/monthly-payments-made.service';
import { IncomesService } from '../incomes/incomes.service';
import { FinesService } from '../fines/fines.service';
import { ExtraContributionsService } from '../extra-contributions/extra-contributions.service';
import { CertificationsService } from '../certifications/certifications.service';
import { DateRangeDto } from './dto/date-range.dto';
import { ContributionsPaidService } from '../contributions-paid/contributions-paid.service';

@Injectable()
export class ReportService {
  constructor(
    private expenseService: ExpensesService,
    private incomeService: IncomesService,
    private monthlyPaymentService: MonthlyPaymentsMadeService,
    private fineService: FinesService,
    private extraContributionService: ExtraContributionsService,
    private contributionService: ContributionsPaidService,
    private certificationService: CertificationsService,
  ) {}

  async getSumIncomesByDate(dateRange: DateRangeDto) {
    const { initDate, endDate } = dateRange;
    const incomeSum = await this.incomeService.getSumByRange({
      initDate,
      endDate,
    });
    const monthlyPaymentSum = await this.monthlyPaymentService.getSumByRange({
      initDate,
      endDate,
    });
    const fineSum = await this.fineService.getSumByRange({ initDate, endDate });
    const extraSum = await this.extraContributionService.getSumByRange({
      initDate,
      endDate,
    });
    const contributionSum = await this.contributionService.getSumByRange({
      initDate,
      endDate,
    });
    const certificationSum = await this.certificationService.getSumByRange({
      initDate,
      endDate,
    });
    return {
      total:
        incomeSum +
        monthlyPaymentSum +
        fineSum +
        extraSum +
        contributionSum +
        certificationSum,
    };
  }

  async getSumExpensesByDate(dateRange: DateRangeDto) {
    const expenseSum = await this.expenseService.getSumByRange(dateRange);
    return { total: expenseSum };
  }
}
