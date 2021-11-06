import { Module } from '@nestjs/common';
import { AttendencesService } from './attendences.service';
import { AttendencesController } from './attendences.controller';

@Module({
  controllers: [AttendencesController],
  providers: [AttendencesService]
})
export class AttendencesModule {}
