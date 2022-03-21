import { EntityRepository, Repository } from 'typeorm';
import { ExtraContributionPaid } from './entities/extra-contribution-paid.entity';

@EntityRepository(ExtraContributionPaid)
export class ExtraContributionsPaidRepository extends Repository<ExtraContributionPaid> {}
