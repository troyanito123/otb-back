import { Attendence } from 'src/modules/attendences/entities/attendence.entity';
import { CustomEntity } from 'src/modules/customEntity.entity';
import { Column, Entity, OneToMany } from 'typeorm';

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

  @OneToMany(() => Attendence, (attendence) => attendence.user, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  attendences: Attendence[];
}
