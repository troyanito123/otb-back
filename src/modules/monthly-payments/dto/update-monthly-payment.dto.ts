import { PartialType } from '@nestjs/mapped-types';
import { CreateMonthlyPaymentDto } from './create-monthly-payment.dto';

export class UpdateMonthlyPaymentDto extends PartialType(CreateMonthlyPaymentDto) {}
