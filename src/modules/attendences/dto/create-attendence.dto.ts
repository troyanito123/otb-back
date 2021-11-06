import { IsNotEmpty } from 'class-validator';
import { Meeting } from 'src/modules/meetings/entities/meeting.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { ExistsOnDatabase } from 'src/validations/exists-on-database';

export class CreateAttendenceDto {
  @IsNotEmpty()
  @ExistsOnDatabase(User)
  userId: number;

  @IsNotEmpty()
  @ExistsOnDatabase(Meeting)
  meetingId: number;
}
