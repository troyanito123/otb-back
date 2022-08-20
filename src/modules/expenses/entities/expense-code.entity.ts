import { CustomEntity } from 'src/modules/customEntity.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'expense-code' })
export class ExpenseCode extends CustomEntity {
  @Column({ name: 'current-code', default: 0 })
  currentCode: number;
}
