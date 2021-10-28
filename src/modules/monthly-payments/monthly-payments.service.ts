import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMonthlyPaymentDto } from './dto/create-monthly-payment.dto';
import { FindAllMonthlyPaymentDto } from './dto/findAll-monthly-palyment.dto';
import { UpdateMonthlyPaymentDto } from './dto/update-monthly-payment.dto';
import { MonthlyPayment } from './entities/monthly-payment.entity';

@Injectable()
export class MonthlyPaymentsService {
  constructor(
    @InjectRepository(MonthlyPayment)
    private monthlyPaymentRepository: Repository<MonthlyPayment>,
  ) {}

  create(createMonthlyPaymentDto: CreateMonthlyPaymentDto) {
    return this.monthlyPaymentRepository.save(createMonthlyPaymentDto);
  }

  findAll(query: FindAllMonthlyPaymentDto) {
    if (query.year)
      return this.monthlyPaymentRepository.find({
        where: { year: query.year },
      });
    return this.monthlyPaymentRepository.find();
  }

  findOne(id: number) {
    return this.monthlyPaymentRepository.findOne(id);
  }

  async update(id: number, updateMonthlyPaymentDto: UpdateMonthlyPaymentDto) {
    const monthly_payment = await this.monthlyPaymentRepository.findOne(id);
    const act = this.monthlyPaymentRepository.merge(
      monthly_payment,
      updateMonthlyPaymentDto,
    );
    return this.monthlyPaymentRepository.save(act);
  }

  remove(id: number) {
    return this.monthlyPaymentRepository.delete(id);
  }
}
