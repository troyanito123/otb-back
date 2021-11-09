import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { RoleOptions, Roles } from '../auth/authorization/role.decorator';
import { RolesGuard } from '../auth/authorization/role.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CertificationsService } from './certifications.service';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { FindByuserCertificationDto } from './dto/find-byuser-certification.dto';
import { FindOneCertificationDto } from './dto/find-one-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';

@Controller('certifications')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CertificationsController {
  constructor(private readonly certificationsService: CertificationsService) {}

  @Post()
  @Roles(RoleOptions.Admin)
  create(@Body() createCertificationDto: CreateCertificationDto) {
    return this.certificationsService.create(createCertificationDto);
  }

  @Get()
  @Roles(RoleOptions.Admin)
  findAll() {
    return this.certificationsService.findAll();
  }

  @Get('total-amount')
  @Roles(RoleOptions.Admin)
  getSumAmount() {
    return this.certificationsService.getSumAmount();
  }

  @Get(':id')
  @Roles(RoleOptions.Admin)
  findOne(@Param() params: FindOneCertificationDto) {
    return this.certificationsService.findOne(params.id);
  }

  @Get('user/:id')
  findByUser(@Param() params: FindByuserCertificationDto) {
    return this.certificationsService.findByUser(params.id);
  }

  @Put(':id')
  @Roles(RoleOptions.Admin)
  update(
    @Param() params: FindOneCertificationDto,
    @Body() updateCertificationDto: UpdateCertificationDto,
  ) {
    return this.certificationsService.update(params.id, updateCertificationDto);
  }

  @Delete(':id')
  @Roles(RoleOptions.Admin)
  remove(@Param() params: FindOneCertificationDto) {
    return this.certificationsService.remove(params.id);
  }
}
