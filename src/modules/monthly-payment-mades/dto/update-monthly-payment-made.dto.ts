import { PartialType } from '@nestjs/mapped-types';
import { CreateMonthlyPaymentMadeDto } from './create-monthly-payment-made.dto';

export class UpdateMonthlyPaymentMadeDto extends PartialType(CreateMonthlyPaymentMadeDto) {}
