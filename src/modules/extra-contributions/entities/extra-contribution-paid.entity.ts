import { CustomEntity } from 'src/modules/customEntity.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { ExtraContribution } from './extra-contribution.entity';

@Entity('extra_contributions_paid')
export class ExtraContributionPaid extends CustomEntity {
  @Column()
  amount: number;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user.extra_contributions_paid)
  user: User;

  @ManyToOne(
    () => ExtraContribution,
    (extra_contribution) => extra_contribution.extra_contributions_paid,
  )
  extra_contribution: ExtraContribution;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
