import { IsDateString, IsEnum, IsNotEmpty } from 'class-validator';
import { GenericStatus } from 'src/modules/genericStatus';

export class UpdateIncomeDto {
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsEnum(GenericStatus)
  status: GenericStatus;
}
