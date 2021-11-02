import { ContributionsPaid } from 'src/modules/contributions-paid/entities/contributions-paid.entity';
import { CustomEntity } from 'src/modules/customEntity.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('contributions')
export class Contribution extends CustomEntity {
  @Column()
  description: string;

  @Column()
  amount: number;

  @OneToMany(
    () => ContributionsPaid,
    (contributionsPaid) => contributionsPaid.contribution,
    {
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  contributions_paid: ContributionsPaid[];
}
