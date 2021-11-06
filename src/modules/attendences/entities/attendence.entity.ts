import { CustomEntity } from 'src/modules/customEntity.entity';
import { Meeting } from 'src/modules/meetings/entities/meeting.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity('attendences')
export class Attendence extends CustomEntity {
  @ManyToOne(() => User, (user) => user.attendences)
  user: User;

  @ManyToOne(() => Meeting, (meeting) => meeting.attendences)
  meeting: Meeting;
}
