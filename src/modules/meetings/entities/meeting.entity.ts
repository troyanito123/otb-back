import { CustomEntity } from 'src/modules/customEntity.entity';
import { Column, Entity } from 'typeorm';

@Entity('meetings')
export class Meeting extends CustomEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  date: Date;

  @Column()
  fine_amount: number;

  @Column({ type: 'text', nullable: true })
  conclutions: string;
}
