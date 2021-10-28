import { CustomEntity } from 'src/modules/customEntity.entity';
import { MonthlyPaymentMade } from 'src/modules/monthly-payment-mades/entities/monthly-payment-made.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';

@Entity('monthly_payments')
export class MonthlyPayment extends CustomEntity {
  @Column()
  month: string;

  @Column()
  year: string;

  @Column()
  amount: number;

  @OneToMany(
    () => MonthlyPaymentMade,
    (monthly_payments_made) => monthly_payments_made.monthly_paymet,
    {
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  monthly_payments_made: MonthlyPaymentMade[];

  @BeforeUpdate()
  @BeforeInsert()
  toUppercase() {
    this.month = this.month.trim().toUpperCase();
  }
}
