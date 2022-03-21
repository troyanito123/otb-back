import { CustomEntity } from 'src/modules/customEntity.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { ExtraContributionPaid } from './extra-contribution-paid.entity';

export enum ExtraContributionStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Entity('extra_contributions')
export class ExtraContribution extends CustomEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  amount: number;

  @Column({
    enum: ExtraContributionStatus,
    default: ExtraContributionStatus.ACTIVE,
  })
  status: ExtraContributionStatus;

  @OneToMany(
    () => ExtraContributionPaid,
    (extra_contributions_paid) => extra_contributions_paid.extra_contribution,
    {
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  extra_contributions_paid: ExtraContributionPaid[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
