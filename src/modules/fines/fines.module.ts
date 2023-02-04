import { Module } from '@nestjs/common';
import { FinesService } from './fines.service';
import { FinesController } from './fines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meeting } from '../meetings/entities/meeting.entity';
import { User } from '../user/entities/user.entity';
import { Fine } from './entities/fine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fine, User, Meeting])],
  controllers: [FinesController],
  providers: [FinesService],
})
export class FinesModule {}
