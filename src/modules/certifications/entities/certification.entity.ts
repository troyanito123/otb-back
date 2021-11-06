import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CustomEntity } from '../../customEntity.entity';

export enum CertificationType {
  SIMPLE = 'SIMPLE',
  COMPLETE = 'COMPLETE',
}

@Entity('certifications')
export class Certification extends CustomEntity {
  @Column()
  description: string;

  @Column()
  amount: number;

  @Column({ default: CertificationType.SIMPLE })
  type: CertificationType;

  @Column({ default: '2021-01-01 00:01:00.000' })
  date: Date;

  @ManyToOne(() => User, (user) => user.certifications)
  user: User;
}
