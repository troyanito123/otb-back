import { Module } from '@nestjs/common';
import { ExtraContributionsService } from './extra-contributions.service';
import { ExtraContributionsController } from './extra-contributions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { ExtraContribution } from './entities/extra-contribution.entity';
import { ExtraContributionPaid } from './entities/extra-contribution-paid.entity';

@Module({
  controllers: [ExtraContributionsController],
  providers: [ExtraContributionsService],
  exports: [ExtraContributionsService],
  imports: [
    TypeOrmModule.forFeature([ExtraContribution, ExtraContributionPaid, User]),
  ],
})
export class ExtraContributionsModule {}
