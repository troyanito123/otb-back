import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, getManager, Like, Repository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { FindAllExpensesDto } from './dto/find-all-expenses.dto';
import { FindByDaterangeDto } from './dto/find-by-daterange.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpenseCode } from './entities/expense-code.entity';
import { Expense } from './entities/expense.entity';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense) private expenseRepository: Repository<Expense>,
    @InjectRepository(ExpenseCode)
    private expenseCodeRepository: Repository<ExpenseCode>,
  ) {}
  async create(createExpenseDto: CreateExpenseDto) {
    const expenseCodes = await this.expenseCodeRepository.find();
    const expenseCode = expenseCodes[0];
    const expense = this.expenseRepository.create(createExpenseDto);
    expense.code = expenseCode.currentCode;
    this.expenseCodeRepository.update(expenseCode.id, {
      currentCode: expenseCode.currentCode + 1,
    });
    return this.expenseRepository.save(expense);
  }

  async findAll(query: FindAllExpensesDto) {
    const page = query.page || 0;
    const keyword = query.keyword || '';
    const take = query.take || 10;
    const skip = page * take;
    const sort = query.sort || 'DESC';

    const [expenses, count] = await this.expenseRepository.findAndCount({
      where: { description: Like('%' + keyword.toUpperCase() + '%') },
      order: { date: sort },
      take,
      skip,
    });
    return { expenses, count };
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

  async getSumAmount() {
    return getManager()
      .createQueryBuilder(Expense, 'expense')
      .select('SUM(expense.amount)', 'total')
      .getRawOne();
  }

  async getByDateRange(dateRangeDto: FindByDaterangeDto) {
    return this.expenseRepository.find({
      where: {
        date: Between(dateRangeDto.initDate, dateRangeDto.endDate),
      },
      order: { date: 'ASC' },
    });
  }

  async getSumByRange(dateRangeDto: FindByDaterangeDto) {
    const expenses = await this.getByDateRange(dateRangeDto);
    return expenses.reduce((acum, curr) => acum + curr.amount, 0);
  }
}
