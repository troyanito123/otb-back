import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContributionDto } from './dto/create-contribution.dto';
import { UpdateContributionDto } from './dto/update-contribution.dto';
import { Contribution } from './entities/contribution.entity';

@Injectable()
export class ContributionsService {
  constructor(
    @InjectRepository(Contribution)
    private contributionRespository: Repository<Contribution>,
  ) {}

  create(createContributionDto: CreateContributionDto) {
    const contribution = this.contributionRespository.create(
      createContributionDto,
    );
    return this.contributionRespository.save(contribution);
  }

  findAll() {
    return this.contributionRespository.find();
  }

  findOne(id: number) {
    return this.contributionRespository.findOne(id);
  }

  async update(id: number, updateContributionDto: UpdateContributionDto) {
    const contribution = await this.contributionRespository.findOne(id);
    this.contributionRespository.merge(contribution, updateContributionDto);
    return this.contributionRespository.save(contribution);
  }

  async remove(id: number) {
    const contribution = await this.contributionRespository.findOne(id);
    await this.contributionRespository.delete(id);
    return contribution;
  }
}
