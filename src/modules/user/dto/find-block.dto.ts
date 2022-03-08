import { IsNotEmpty } from 'class-validator';

export class FindBlockDto {
  @IsNotEmpty()
  block: string;
}
