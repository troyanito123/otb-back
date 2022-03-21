import { Module } from '@nestjs/common';
import { ExtraContributionsService } from './extra-contributions.service';
import { ExtraContributionsController } from './extra-contributions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtraContributionsRepository } from './extra-contributions.repository';
import { User } from '../user/entities/user.entity';
import { ExtraContributionsPaidRepository } from './extra-contributions-paid.repository';

@Module({
  controllers: [ExtraContributionsController],
  providers: [ExtraContributionsService],
  imports: [
    TypeOrmModule.forFeature([
      ExtraContributionsRepository,
      ExtraContributionsPaidRepository,
      User,
    ]),
  ],
})
export class ExtraContributionsModule {}
