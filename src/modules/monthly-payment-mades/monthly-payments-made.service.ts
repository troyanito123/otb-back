import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';
import { MonthlyPayment } from '../monthly-payments/entities/monthly-payment.entity';
import { User } from '../user/entities/user.entity';
import { CreateManyPaymentsDto } from './dto/create-many-payments.dto';
import { CreateMonthlyPaymentMadeDto } from './dto/create-monthly-payment-made.dto';
import { UpdateMonthlyPaymentMadeDto } from './dto/update-monthly-payment-made.dto';
import { MonthlyPaymentMade } from './entities/monthly-payment-made.entity';

@Injectable()
export class MonthlyPaymentsMadeService {
  constructor(
    @InjectRepository(MonthlyPaymentMade)
    private monthlyPaymentMadeRepository: Repository<MonthlyPaymentMade>,

    @InjectRepository(MonthlyPayment)
    private monthlyPaymentRepository: Repository<MonthlyPayment>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createMonthlyPaymentMadeDto: CreateMonthlyPaymentMadeDto) {
    const monthlyPayment = await this.monthlyPaymentRepository.findOne(
      createMonthlyPaymentMadeDto.monthlyPaymentId,
    );

    const user = await this.userRepository.findOne(
      createMonthlyPaymentMadeDto.userId,
    );

    const mpm = this.monthlyPaymentMadeRepository.create(
      createMonthlyPaymentMadeDto,
    );

    mpm.monthly_paymet = monthlyPayment;
    mpm.user = user;

    const res = await this.monthlyPaymentMadeRepository.save(mpm);

    const { password, status, ...rest } = res.user;

    res.user = rest as User;

    return res;
  }

  async findAll() {
    const res = await this.monthlyPaymentMadeRepository.find({
      relations: ['user', 'monthly_paymet'],
    });

    return res.map((r) => ({
      ...r,
      user: { id: r.user.id, name: r.user.name, email: r.user.email },
    }));
  }

  async findByUser(id: number, year: string) {
    const res = await createQueryBuilder('MonthlyPaymentMade')
      .leftJoinAndSelect('MonthlyPaymentMade.user', 'user')
      .leftJoinAndSelect('MonthlyPaymentMade.monthly_paymet', 'monthlyPayment')
      .where('user.id = :id', { id })
      .andWhere('monthlyPayment.year = :year', { year })
      .getMany();

    return res.map((r: any) => ({
      ...r,
      user: { id: r.user.id, name: r.user.name, email: r.user.email },
    }));
  }

  async findOne(id: number) {
    const res = await this.monthlyPaymentMadeRepository.findOne(id, {
      relations: ['user', 'monthly_paymet'],
    });

    const { password, status, ...rest } = res.user;

    res.user = rest as User;
    return res;
  }

  async update(
    id: number,
    updateMonthlyPaymentMadeDto: UpdateMonthlyPaymentMadeDto,
  ) {
    const mpm = await this.monthlyPaymentMadeRepository.findOne(id, {
      relations: ['user', 'monthly_paymet'],
    });
    this.monthlyPaymentMadeRepository.merge(mpm, updateMonthlyPaymentMadeDto);

    const res = await this.monthlyPaymentMadeRepository.save(mpm);

    const { password, status, ...rest } = res.user;
    res.user = rest as User;
    return res;
  }

  async remove(id: number) {
    const mpm = await this.monthlyPaymentMadeRepository.findOne(id, {
      relations: ['user', 'monthly_paymet'],
    });

    const { password, status, ...rest } = mpm.user;
    mpm.user = rest as User;

    await this.monthlyPaymentMadeRepository.delete(id);

    return mpm;
  }

  async createMany(createManyPaymentsDto: CreateManyPaymentsDto) {
    const user = await this.userRepository.findOne(
      createManyPaymentsDto.userId,
    );

    const monthIds = JSON.parse(createManyPaymentsDto.monthsId) as number[];

    const res = [];

    for (let i = 0; i < monthIds.length; i++) {
      const monthId = monthIds[i];
      const payment = await this.monthlyPaymentRepository.findOne(monthId);
      const paymentMade = this.monthlyPaymentMadeRepository.create();
      paymentMade.user = user;
      paymentMade.monthly_paymet = payment;
      paymentMade.amount = payment.amount;
      paymentMade.date = createManyPaymentsDto.date;
      const partialRes = await this.monthlyPaymentMadeRepository.save(
        paymentMade,
      );

      const { password, status, ...rest } = partialRes.user;
      partialRes.user = rest as User;
      res.push(partialRes);
    }

    return res;
  }
}
