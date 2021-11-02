import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContributionsPaidService } from './contributions-paid.service';
import { CreateContributionsPaidDto } from './dto/create-contributions-paid.dto';
import { UpdateContributionsPaidDto } from './dto/update-contributions-paid.dto';

@Controller('contributions-paid')
export class ContributionsPaidController {
  constructor(private readonly contributionsPaidService: ContributionsPaidService) {}

  @Post()
  create(@Body() createContributionsPaidDto: CreateContributionsPaidDto) {
    return this.contributionsPaidService.create(createContributionsPaidDto);
  }

  @Get()
  findAll() {
    return this.contributionsPaidService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contributionsPaidService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContributionsPaidDto: UpdateContributionsPaidDto) {
    return this.contributionsPaidService.update(+id, updateContributionsPaidDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contributionsPaidService.remove(+id);
  }
}
