import { Module } from '@nestjs/common';
import { ContributionsPaidService } from './contributions-paid.service';
import { ContributionsPaidController } from './contributions-paid.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContributionsPaid } from './entities/contributions-paid.entity';
import { Contribution } from '../contributions/entities/contribution.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContributionsPaid, User, Contribution])],
  controllers: [ContributionsPaidController],
  providers: [ContributionsPaidService],
  exports: [ContributionsPaidService],
})
export class ContributionsPaidModule {}
