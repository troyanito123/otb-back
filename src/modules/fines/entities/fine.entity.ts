import { CustomEntity } from 'src/modules/customEntity.entity';
import { Meeting } from 'src/modules/meetings/entities/meeting.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('fines')
export class Fine extends CustomEntity {
  @Column()
  fine_paid: number;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user.fines)
  user: User;

  @ManyToOne(() => Meeting, (meeting) => meeting.fines)
  meeting: Meeting;
}
