import { Contribution } from 'src/modules/contributions/entities/contribution.entity';
import { CustomEntity } from 'src/modules/customEntity.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('contributions_paid')
export class ContributionsPaid extends CustomEntity {
  @Column()
  amount: number;

  @Column({ default: new Date().toISOString() })
  date: Date;

  @ManyToOne(() => User, (user) => user.contributions_paid)
  user: User;

  @ManyToOne(
    () => Contribution,
    (contribution) => contribution.contributions_paid,
  )
  contribution: Contribution;
}
