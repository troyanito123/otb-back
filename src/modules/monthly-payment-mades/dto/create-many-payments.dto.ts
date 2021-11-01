import { IsNotEmpty } from 'class-validator';

export class CreateManyPaymentsDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  monthsId: string;
}
