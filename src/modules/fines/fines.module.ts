import { Module } from '@nestjs/common';
import { FinesService } from './fines.service';
import { FinesController } from './fines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meeting } from '../meetings/entities/meeting.entity';
import { User } from '../user/entities/user.entity';
import { Fine } from './entities/fine.entity';
import { Attendence } from '../attendences/entities/attendence.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fine, User, Meeting, Attendence])],
  controllers: [FinesController],
  providers: [FinesService],
  exports: [FinesService],
})
export class FinesModule {}
