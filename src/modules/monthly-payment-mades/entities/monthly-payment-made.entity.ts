import { CustomEntity } from 'src/modules/customEntity.entity';
import { MonthlyPayment } from 'src/modules/monthly-payments/entities/monthly-payment.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('monthly_payments_made')
export class MonthlyPaymentMade extends CustomEntity {
  @Column()
  amount: number;

  @ManyToOne(() => User, (user) => user.monthly_payments_made)
  user: User;

  @ManyToOne(
    () => MonthlyPayment,
    (monthlyPayment) => monthlyPayment.monthly_payments_made,
  )
  monthly_paymet: MonthlyPayment;
}
