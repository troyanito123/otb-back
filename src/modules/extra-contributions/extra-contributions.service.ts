import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateExtraContributionDto } from './dto/create-extra-contribution.dto';
import { CreateExtraContributionsPaidDto } from './dto/create-extra-contributions-paid.dto';
import { UpdateExtraContributionDto } from './dto/update-extra-contribution.dto';
import { ExtraContributionPaid } from './entities/extra-contribution-paid.entity';
import { ExtraContributionsPaidRepository } from './extra-contributions-paid.repository';
import { ExtraContributionsRepository } from './extra-contributions.repository';

@Injectable()
export class ExtraContributionsService {
  constructor(
    private extraContRepo: ExtraContributionsRepository,
    private extraContPaidRepo: ExtraContributionsPaidRepository,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  create(createExtraContributionDto: CreateExtraContributionDto) {
    return this.extraContRepo.save(createExtraContributionDto);
  }

  findAll() {
    return this.extraContRepo.find({ order: { createdAt: 'ASC' } });
  }

  async findOne(id: number) {
    const ec = await this.extraContRepo.findOne(id, {
      relations: ['extra_contributions_paid', 'extra_contributions_paid.user'],
    });

    return {
      ...ec,
      extra_contributions_paid: ec.extra_contributions_paid.map((e) => ({
        ...e,
        user: { id: e.user.id, name: e.user.name },
      })),
    };
  }

  async update(
    id: number,
    updateExtraContributionDto: UpdateExtraContributionDto,
  ) {
    const extra = await this.extraContRepo.findOne(id, {
      relations: ['extra_contributions_paid', 'extra_contributions_paid.user'],
    });

    this.extraContRepo.merge(extra, updateExtraContributionDto);
    const saved = await this.extraContRepo.save(extra);
    return {
      ...saved,
      extra_contributions_paid: saved.extra_contributions_paid.map((e) => ({
        ...e,
        user: { id: e.user.id, name: e.user.name },
      })),
    };
  }

  async payExtraContribution(
    createExtraContributionsPaidDto: CreateExtraContributionsPaidDto,
  ) {
    const { userId, extraContributionId, date } =
      createExtraContributionsPaidDto;

    const user = await this.userRepo.findOne(userId);
    const extra_contribution = await this.extraContRepo.findOne(
      extraContributionId,
    );

    const paid = await this.extraContPaidRepo.save({
      date,
      user,
      extra_contribution,
      amount: extra_contribution.amount,
    });
    return { ...paid, user: { id: paid.user.id, name: paid.user.name } };
  }

  public async findByUser(userId: number) {
    const all = await this.extraContRepo.find({ order: { createdAt: 'ASC' } });
    const byUser = await this.extraContPaidRepo.find({
      where: { user: { id: userId } },
      relations: ['extra_contribution'],
    });
    const byUserContr = byUser.map((u) => ({
      ...u.extra_contribution,
      date: u.date,
    }));
    return all.map((a) => {
      const aux = byUserContr.find((u) => u.id === a.id);
      if (aux)
        return {
          ...a,
          amount_paid: aux.amount,
          date_paid: aux.date,
        };
      return { ...a, amount_paid: 0, date_paid: null };
    });
  }

  async getSumAmount() {
    return getManager()
      .createQueryBuilder(ExtraContributionPaid, 'extra')
      .select('SUM(extra.amount)', 'total')
      .getRawOne();
  }
}
