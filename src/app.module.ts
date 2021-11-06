import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { config } from './config/config';
import { DatabaseConfig } from './config/database.config';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MonthlyPaymentsModule } from './modules/monthly-payments/monthly-payments.module';
import { MonthlyPaymentMadesModule } from './modules/monthly-payment-mades/monthly-payments-made.module';
import { ContributionsModule } from './modules/contributions/contributions.module';
import { ContributionsPaidModule } from './modules/contributions-paid/contributions-paid.module';
import { CertificationsModule } from './modules/certifications/certifications.module';
import { MeetingsModule } from './modules/meetings/meetings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig,
    }),
    RoleModule,
    UserModule,
    AuthModule,
    MonthlyPaymentsModule,
    MonthlyPaymentMadesModule,
    ContributionsModule,
    ContributionsPaidModule,
    CertificationsModule,
    MeetingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
