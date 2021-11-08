import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense) private expenseRepository: Repository<Expense>,
  ) {}
  create(createExpenseDto: CreateExpenseDto) {
    const expense = this.expenseRepository.create(createExpenseDto);
    return this.expenseRepository.save(expense);
  }

  findAll() {
    return this.expenseRepository.find({ order: { date: 'ASC' } });
  }

  findOne(id: number) {
    return this.expenseRepository.findOne(id);
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const expense = await this.expenseRepository.findOne(id);
    this.expenseRepository.merge(expense, updateExpenseDto);
    return this.expenseRepository.save(expense);
  }

  async remove(id: number) {
    const expense = await this.expenseRepository.findOne(id);
    await this.expenseRepository.delete(id);
    return expense;
  }
}
