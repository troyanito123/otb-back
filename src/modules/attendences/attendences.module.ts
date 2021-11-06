import { Module } from '@nestjs/common';
import { AttendencesService } from './attendences.service';
import { AttendencesController } from './attendences.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendence } from './entities/attendence.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attendence, User])],
  controllers: [AttendencesController],
  providers: [AttendencesService],
})
export class AttendencesModule {}
