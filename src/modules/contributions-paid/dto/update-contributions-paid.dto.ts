import { PartialType } from '@nestjs/mapped-types';
import { CreateContributionsPaidDto } from './create-contributions-paid.dto';

export class UpdateContributionsPaidDto extends PartialType(CreateContributionsPaidDto) {}
