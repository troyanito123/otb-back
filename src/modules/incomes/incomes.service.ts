import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, getConnection, getManager, Repository } from 'typeorm';
import { GenericStatus } from '../genericStatus';
import { QueryPageable } from '../queryPageable.dto';
import { UserService } from '../user/user.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { Income } from './entities/income.entity';
import { FindByDaterangeDto } from './dto/find-by-daterange.dto';

@Injectable()
export class IncomesService {
  constructor(
    @InjectRepository(Income) private incomeRepository: Repository<Income>,
    private userService: UserService,
  ) {}
  async create(createIncomeDto: CreateIncomeDto) {
    const income = this.incomeRepository.create(createIncomeDto);
    const user = await this.userService.findUserById(createIncomeDto.userId);
    income.user = user;
    const newIncome = await this.incomeRepository.save(income);
    return {
      ...newIncome,
      user: { id: newIncome.user.id, name: newIncome.user.name },
    };
  }

  async findAll() {
    const incomes = await this.incomeRepository.find({ relations: ['user'] });
    return incomes.map((i) => ({
      ...i,
      user: { id: i.user.id, name: i.user.name },
    }));
  }

  async findAllPageable(query: QueryPageable) {
    const page = query.page || 0;
    const keyword = query.keyword || '';
    const take = query.take || 10;
    const skip = page * take;
    const sort = query.sort || 'ASC';

    let columnOrder = '';
    switch (query.column) {
      case 'amount':
        columnOrder = 'income.amount';
        break;
      case 'description':
        columnOrder = 'income.description';
      case 'date':
        columnOrder = 'income.date';
      case 'status':
        columnOrder = 'income.status';
        break;
      case 'user':
        columnOrder = 'income.date';
        break;
    }

    const [data, count] = await getConnection()
      .createQueryBuilder(Income, 'income')
      .leftJoin('income.user', 'user')
      .where('user.name ILIKE :name', { name: `%${keyword.toUpperCase()}%` })
      .addSelect('income.id')
      .addSelect('income.amount')
      .addSelect('income.description')
      .addSelect('income.collector')
      .addSelect('income.date')
      .addSelect('income.status')
      .addSelect('user.id')
      .addSelect('user.name')
      .limit(take)
      .offset(skip)
      .orderBy(columnOrder, sort)
      .getManyAndCount();
    return { data, count };
  }

  async findAllByUser(userId: number) {
    const incomes = await this.incomeRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    return incomes.map((i) => ({
      ...i,
      user: { id: i.user.id, name: i.user.name },
    }));
  }

  async findOne(id: number) {
    const income = await this.incomeRepository.findOneOrFail({
      where: { id },
      relations: ['user'],
    });
    return {
      ...income,
      user: { id: income.user.id, name: income.user.name },
    };
  }

  async update(id: number, updateIncomeDto: UpdateIncomeDto) {
    const income = await this.incomeRepository.findOneOrFail(id, {
      relations: ['user'],
    });
    this.incomeRepository.merge(income, updateIncomeDto);
    const newIncome = await this.incomeRepository.save(income);
    return {
      ...newIncome,
      user: { id: newIncome.user.id, name: newIncome.user.name },
    };
  }

  async remove(id: number) {
    const income = await this.incomeRepository.findOneOrFail(id, {
      relations: ['user'],
    });
    income.status = GenericStatus.DELETED;
    const newIncome = await this.incomeRepository.save(income);
    return {
      ...newIncome,
      user: { id: newIncome.user.id, name: newIncome.user.name },
    };
  }

  async getSumAmount() {
    return getManager()
      .createQueryBuilder(Income, 'income')
      .select('SUM(income.amount)', 'total')
      .getRawOne();
  }

  async getByDateRange(dateRangeDto: FindByDaterangeDto) {
    const { initDate, endDate } = dateRangeDto;
    const res = await this.incomeRepository.find({
      where: { date: Between(initDate, endDate) },
      order: { date: 'ASC' },
      relations: ['user'],
    });

    return res.map((r) => ({
      id: r.id,
      amount: r.amount,
      description: r.description,
      date: r.date,
      toUser: r.collector,
      fromUser: r.user.name,
    }));
  }

  async getSumByRange(dateRangeDto: FindByDaterangeDto) {
    const incomes = await this.getByDateRange(dateRangeDto);
    return incomes.reduce((acum, curr) => acum + curr.amount, 0);
  }
}
