import { Contribution } from 'src/modules/contributions/entities/contribution.entity';
import { CustomEntity } from 'src/modules/customEntity.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('contributions_paid')
export class ContributionsPaid extends CustomEntity {
  @Column()
  amount: number;

  @Column({ default: '2021-01-01 00:01:00.000' })
  date: Date;

  @ManyToOne(() => User, (user) => user.contributions_paid)
  user: User;

  @ManyToOne(
    () => Contribution,
    (contribution) => contribution.contributions_paid,
  )
  contribution: Contribution;
}
