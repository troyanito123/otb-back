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
import { MonthlyPaymentsMadeService } from './monthly-payments-made.service';
import { CreateMonthlyPaymentMadeDto } from './dto/create-monthly-payment-made.dto';
import { UpdateMonthlyPaymentMadeDto } from './dto/update-monthly-payment-made.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/authorization/role.guard';
import { RoleOptions, Roles } from '../auth/authorization/role.decorator';

@Controller('monthly-payments-made')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MonthlyPaymentsMadeController {
  constructor(
    private readonly monthlyPaymentMadesService: MonthlyPaymentsMadeService,
  ) {}

  @Post()
  @Roles(RoleOptions.Admin)
  create(@Body() createMonthlyPaymentMadeDto: CreateMonthlyPaymentMadeDto) {
    return this.monthlyPaymentMadesService.create(createMonthlyPaymentMadeDto);
  }

  @Get()
  @Roles(RoleOptions.Admin)
  findAll() {
    return this.monthlyPaymentMadesService.findAll();
  }

  @Get('user/:id')
  findByUser() {
    return this.monthlyPaymentMadesService.findByUser();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.monthlyPaymentMadesService.findOne(+id);
  }

  @Put(':id')
  @Roles(RoleOptions.Admin)
  update(
    @Param('id') id: string,
    @Body() updateMonthlyPaymentMadeDto: UpdateMonthlyPaymentMadeDto,
  ) {
    return this.monthlyPaymentMadesService.update(
      +id,
      updateMonthlyPaymentMadeDto,
    );
  }

  @Delete(':id')
  @Roles(RoleOptions.Admin)
  remove(@Param('id') id: string) {
    return this.monthlyPaymentMadesService.remove(+id);
  }
}
