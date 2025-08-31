import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsNumberString,
  Length,
  Matches,
  IsIn,
} from 'class-validator';
import { MeetingType } from '../enums/meeting-type.enum';

export class CreateMeetingDto {
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

  @IsOptional()
  @IsNumberString({}, { message: 'El año debe ser un número válido' })
  @Length(4, 4, { message: 'El año debe tener exactamente 4 dígitos' })
  @Matches(/^(202[1-9]|2030)$/, { message: 'El año debe estar entre 2021 y 2030' })
  year: string;

  @IsOptional()
  @IsIn(Object.values(MeetingType), {
    message: `El tipo debe ser uno de los siguientes: ${Object.values(MeetingType).join(', ')}`,
  })
  type: MeetingType;
}
