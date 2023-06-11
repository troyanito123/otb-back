import { Module } from '@nestjs/common';
import { CertificationsService } from './certifications.service';
import { CertificationsController } from './certifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Certification } from './entities/certification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Certification])],
  controllers: [CertificationsController],
  providers: [CertificationsService],
  exports: [CertificationsService]
})
export class CertificationsModule {}
