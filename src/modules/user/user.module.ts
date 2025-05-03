import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RoleModule } from '../role/role.module';
import { AttendencesModule } from '../attendences/attendences.module';
import { Attendence } from '../attendences/entities/attendence.entity';
import { FinesModule } from '../fines/fines.module';
import { MonthlyPaymentMadesModule } from '../monthly-payment-mades/monthly-payments-made.module';
import { ExtraContributionsModule } from '../extra-contributions/extra-contributions.module';
import { ContributionsPaidModule } from '../contributions-paid/contributions-paid.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Attendence]),
    RoleModule,
    AttendencesModule,
    FinesModule,
    MonthlyPaymentMadesModule,
    ExtraContributionsModule,
    ContributionsPaidModule,
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
