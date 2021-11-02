import { Injectable } from '@nestjs/common';
import { CreateContributionsPaidDto } from './dto/create-contributions-paid.dto';
import { UpdateContributionsPaidDto } from './dto/update-contributions-paid.dto';

@Injectable()
export class ContributionsPaidService {
  create(createContributionsPaidDto: CreateContributionsPaidDto) {
    return 'This action adds a new contributionsPaid';
  }

  findAll() {
    return `This action returns all contributionsPaid`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contributionsPaid`;
  }

  update(id: number, updateContributionsPaidDto: UpdateContributionsPaidDto) {
    return `This action updates a #${id} contributionsPaid`;
  }

  remove(id: number) {
    return `This action removes a #${id} contributionsPaid`;
  }
}
