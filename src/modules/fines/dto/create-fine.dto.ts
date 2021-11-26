import { IsDateString, IsNotEmpty } from 'class-validator';
import { Meeting } from 'src/modules/meetings/entities/meeting.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { ExistsOnDatabase } from 'src/validations/exists-on-database';

export class CreateFineDto {
  @IsNotEmpty()
  fine_paid: number;

  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @ExistsOnDatabase(User)
  userId: number;

  @IsNotEmpty()
  @ExistsOnDatabase(Meeting)
  meetingId: number;
}
