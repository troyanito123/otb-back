import { Role } from '../../role/entities/role.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PasswordEncrypter } from '../../../utils/password-encrypter';
import { MonthlyPaymentMade } from 'src/modules/monthly-payment-mades/entities/monthly-payment-made.entity';
import { Contribution } from 'src/modules/contributions/entities/contribution.entity';
import { ContributionsPaid } from 'src/modules/contributions-paid/entities/contributions-paid.entity';
import { Certification } from 'src/modules/certifications/entities/certification.entity';
import { Attendence } from 'src/modules/attendences/entities/attendence.entity';
import { Fine } from 'src/modules/fines/entities/fine.entity';
import { ExtraContributionPaid } from 'src/modules/extra-contributions/entities/extra-contribution-paid.entity';
import { Income } from 'src/modules/incomes/entities/income.entity';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETE = 'DELETE',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  identification_number: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: 'UNDEFINED' })
  address_number: string;

  @Column({ default: 'UNDEFINED' })
  block_number: string;

  @Column({ default: UserStatus.INACTIVE })
  status: UserStatus;

  @Column({default: '2021-05-01T00:00:00.000Z'})
  subscription_at: String

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToMany(
    () => MonthlyPaymentMade,
    (monthly_payments_made) => monthly_payments_made.user,
    {
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  monthly_payments_made: MonthlyPaymentMade[];

  @OneToMany(
    () => ContributionsPaid,
    (contributionPaid) => contributionPaid.user,
    {
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  contributions_paid: ContributionsPaid[];

  @OneToMany(
    () => ExtraContributionPaid,
    (extra_contributions_paid) => extra_contributions_paid.user,
    {
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  extra_contributions_paid: ExtraContributionPaid[];

  @OneToMany(() => Certification, (certificaion) => certificaion.user, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  certifications: Certification[];

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

  @OneToMany(() => Income, (income) => income.user, { cascade: true })
  incomes: Income[];

  authenicate(password: string): boolean {
    return PasswordEncrypter.compare(password, this.password);
  }

  @BeforeInsert()
  addSubscriptionAt(){
    this.subscription_at = new Date().toISOString()
  }
}
