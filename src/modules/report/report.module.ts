import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { IncomesModule } from '../incomes/incomes.module';
import { FinesModule } from '../fines/fines.module';
import { ExtraContributionsModule } from '../extra-contributions/extra-contributions.module';
import { ExpensesModule } from '../expenses/expenses.module';
import { CertificationsModule } from '../certifications/certifications.module';
import { MonthlyPaymentMadesModule } from '../monthly-payment-mades/monthly-payments-made.module';
import { ContributionsPaidModule } from '../contributions-paid/contributions-paid.module';
import { Meeting } from '../meetings/entities/meeting.entity';
import { User } from '../user/entities/user.entity';
import { Attendence } from '../attendences/entities/attendence.entity';
import { Fine } from '../fines/entities/fine.entity';
import { MonthlyPayment } from '../monthly-payments/entities/monthly-payment.entity';
import { MonthlyPaymentMade } from '../monthly-payment-mades/entities/monthly-payment-made.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meeting, User, Attendence, Fine, MonthlyPayment, MonthlyPaymentMade]),
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
