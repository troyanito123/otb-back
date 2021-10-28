import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMonthlyPaymentDto } from './dto/create-monthly-payment.dto';
import { UpdateMonthlyPaymentDto } from './dto/update-monthly-payment.dto';
import { MonthlyPayment } from './entities/monthly-payment.entity';

@Injectable()
export class MonthlyPaymentsService {
  constructor(
    @InjectRepository(MonthlyPayment)
    private monthlyPaymentRepository: Repository<MonthlyPayment>,
  ) {}

  create(createMonthlyPaymentDto: CreateMonthlyPaymentDto) {
    return 'This action adds a new monthlyPayment';
  }

  findAll() {
    return `This action returns all monthlyPayments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} monthlyPayment`;
  }

  update(id: number, updateMonthlyPaymentDto: UpdateMonthlyPaymentDto) {
    return `This action updates a #${id} monthlyPayment`;
  }

  remove(id: number) {
    return `This action removes a #${id} monthlyPayment`;
  }
}
