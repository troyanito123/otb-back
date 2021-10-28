import { Role } from '../../role/entities/role.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PasswordEncrypter } from '../../../utils/password-encrypter';
import { MonthlyPaymentMade } from 'src/modules/monthly-payment-mades/entities/monthly-payment-made.entity';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  DELETE = 'DELETE',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: UserStatus.ACTIVE })
  status: UserStatus;

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

  authenicate(password: string): boolean {
    return PasswordEncrypter.compare(password, this.password);
  }
}