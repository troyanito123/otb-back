import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateMeetingDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  fine_amount: number;

  @IsOptional()
  conclutions: string;
}
