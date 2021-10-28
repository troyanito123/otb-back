import { CustomEntity } from 'src/modules/customEntity.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';

@Entity('monthly_payments')
export class MonthlyPayment extends CustomEntity {
  @Column()
  month: string;

  @Column()
  year: string;

  @Column()
  amount: number;

  @BeforeUpdate()
  @BeforeInsert()
  toUppercase() {
    this.month = this.month.trim().toUpperCase();
  }
}
