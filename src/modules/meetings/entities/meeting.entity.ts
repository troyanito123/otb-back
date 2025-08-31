import { Attendence } from 'src/modules/attendences/entities/attendence.entity';
import { CustomEntity } from 'src/modules/customEntity.entity';
import { Fine } from 'src/modules/fines/entities/fine.entity';
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

  @Column({ default: null, nullable: true })
  year: string;

  @Column({ default: null, nullable: true })
  type: string;

  @OneToMany(() => Attendence, (attendence) => attendence.user, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  attendences: Attendence[];

  @OneToMany(() => Fine, (fine) => fine.user, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  fines: Fine[];
}
