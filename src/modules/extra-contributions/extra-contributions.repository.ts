import { EntityRepository, Repository } from 'typeorm';
import { ExtraContribution } from './entities/extra-contribution.entity';

@EntityRepository(ExtraContribution)
export class ExtraContributionsRepository extends Repository<ExtraContribution> {}
