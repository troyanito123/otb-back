import { Module } from '@nestjs/common';
import { FinesService } from './fines.service';
import { FinesController } from './fines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meeting } from '../meetings/entities/meeting.entity';
import { User } from '../user/entities/user.entity';
import { FinesRepository } from './fines.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FinesRepository, User, Meeting])],
  controllers: [FinesController],
  providers: [FinesService],
})
export class FinesModule {}
