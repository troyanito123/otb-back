import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { IncomesModule } from '../incomes/incomes.module';
import { FinesModule } from '../fines/fines.module';
import { ExtraContributionsModule } from '../extra-contributions/extra-contributions.module';
import { ExpensesModule } from '../expenses/expenses.module';
import { CertificationsModule } from '../certifications/certifications.module';
import { MonthlyPaymentMadesModule } from '../monthly-payment-mades/monthly-payments-made.module';
import { ContributionsPaidModule } from '../contributions-paid/contributions-paid.module';

@Module({
  imports: [
    MonthlyPaymentMadesModule,
    IncomesModule,
    FinesModule,
    ExtraContributionsModule,
    ExpensesModule,
    ContributionsPaidModule,
    CertificationsModule,
  ],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
