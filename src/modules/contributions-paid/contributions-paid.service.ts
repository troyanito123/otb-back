import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  createQueryBuilder,
  getConnection,
  getManager,
  getRepository,
  Repository,
} from 'typeorm';
import { Contribution } from '../contributions/entities/contribution.entity';
import { User } from '../user/entities/user.entity';
import { CreateContributionsPaidDto } from './dto/create-contributions-paid.dto';
import { CreateManyContributionsPaidDto } from './dto/create-many-contributions-paid.dto';
import { FindByDateContributionPaidDto } from './dto/find-by-date-contributions-paid.dto';
import { UpdateContributionsPaidDto } from './dto/update-contributions-paid.dto';
import { ContributionsPaid } from './entities/contributions-paid.entity';

@Injectable()
export class ContributionsPaidService {
  constructor(
    @InjectRepository(ContributionsPaid)
    private contributionsPaidRepository: Repository<ContributionsPaid>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Contribution)
    private contributionRepository: Repository<Contribution>,
  ) {}

  async create(createContributionsPaidDto: CreateContributionsPaidDto) {
    const contributionPaid = this.contributionsPaidRepository.create(
      createContributionsPaidDto,
    );
    contributionPaid.user = await this.userRepository.findOne(
      createContributionsPaidDto.userId,
    );

    contributionPaid.contribution = await this.contributionRepository.findOne(
      createContributionsPaidDto.contributionId,
    );

    const saved = await this.contributionsPaidRepository.save(contributionPaid);
    const { user } = saved;
    const { password, ...rest } = user;
    saved.user = rest as User;
    return saved;
  }

  async createMany(createManyDto: CreateManyContributionsPaidDto) {
    const contributionsId = JSON.parse(createManyDto.contributionsId);
    const user = await this.userRepository.findOne(createManyDto.userId);
    const res: ContributionsPaid[] = [];
    for (let i = 0; i < contributionsId.length; i++) {
      const cid = contributionsId[i];
      const contribution = await this.contributionRepository.findOne(cid);
      const contributionPaid = this.contributionsPaidRepository.create({
        amount: contribution.amount,
        user,
        contribution,
        date: createManyDto.date,
      });
      const partial = await this.contributionsPaidRepository.save(
        contributionPaid,
      );
      res.push(partial);
    }
    return res.map((r) => ({
      ...r,
      user: { id: r.user.id, name: r.user.name, email: r.user.email },
    }));
  }

  async findAll() {
    const res = await this.contributionsPaidRepository.find({
      relations: ['user', 'contribution'],
    });

    return res.map((r) => ({
      ...r,
      user: { id: r.user.id, name: r.user.name, email: r.user.email },
    }));
  }

  async findByUser(id: number) {
    const user = await this.userRepository.findOne(id);
    const res = await this.contributionsPaidRepository.find({
      where: { user },
      relations: ['user', 'contribution'],
    });

    return res.map((r) => ({
      ...r,
      user: { id: r.user.id, name: r.user.name, email: r.user.email },
    }));
  }

  async findOne(id: number) {
    const res = await this.contributionsPaidRepository.findOne(id, {
      relations: ['user', 'contribution'],
    });

    const { user } = res;
    const { password, ...rest } = user;
    res.user = rest as User;
    return res;
  }

  async update(
    id: number,
    updateContributionsPaidDto: UpdateContributionsPaidDto,
  ) {
    const contributionPaid = await this.contributionsPaidRepository.findOne(
      id,
      { relations: ['user', 'contribution'] },
    );
    this.contributionsPaidRepository.merge(
      contributionPaid,
      updateContributionsPaidDto,
    );
    const res = await this.contributionsPaidRepository.save(contributionPaid);
    const { user } = res;
    const { password, ...rest } = user;
    res.user = rest as User;
    return res;
  }

  async remove(id: number) {
    const contributionPaid = await this.contributionsPaidRepository.findOne(
      id,
      { relations: ['user', 'contribution'] },
    );

    await this.contributionsPaidRepository.delete(id);

    const { user } = contributionPaid;
    const { password, ...rest } = user;
    contributionPaid.user = rest as User;
    return contributionPaid;
  }

  async getSumAmount() {
    return getManager()
      .createQueryBuilder(ContributionsPaid, 'contributionsPaid')
      .select('SUM(contributionsPaid.amount)', 'total')
      .getRawOne();
  }

  async findByDateRange(findByDateDto: FindByDateContributionPaidDto) {
    const { initDate, endDate } = findByDateDto;
    const contributionPaids = await this.contributionsPaidRepository.find({
      where: { date: Between(initDate, endDate) },
      relations: ['user', 'contribution'],
      order: {date: 'ASC'}
    });

    return contributionPaids.map((r) => ({
      ...r,
      user: { id: r.user.id, name: r.user.name, email: r.user.email },
    }));
  }
}
