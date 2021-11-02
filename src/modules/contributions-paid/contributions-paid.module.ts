import { Module } from '@nestjs/common';
import { ContributionsPaidService } from './contributions-paid.service';
import { ContributionsPaidController } from './contributions-paid.controller';

@Module({
  controllers: [ContributionsPaidController],
  providers: [ContributionsPaidService]
})
export class ContributionsPaidModule {}
