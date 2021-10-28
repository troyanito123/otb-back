import { Injectable } from '@nestjs/common';
import { CreateMonthlyPaymentMadeDto } from './dto/create-monthly-payment-made.dto';
import { UpdateMonthlyPaymentMadeDto } from './dto/update-monthly-payment-made.dto';

@Injectable()
export class MonthlyPaymentsMadeService {
  create(createMonthlyPaymentMadeDto: CreateMonthlyPaymentMadeDto) {
    return 'This action adds a new monthlyPaymentMade';
  }

  findAll() {
    return `This action returns all monthlyPaymentMades`;
  }

  findByUser() {
    return `This action return monthlyPaymentMades for user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} monthlyPaymentMade`;
  }

  update(id: number, updateMonthlyPaymentMadeDto: UpdateMonthlyPaymentMadeDto) {
    return `This action updates a #${id} monthlyPaymentMade`;
  }

  remove(id: number) {
    return `This action removes a #${id} monthlyPaymentMade`;
  }
}
