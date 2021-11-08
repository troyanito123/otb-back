import { CustomEntity } from 'src/modules/customEntity.entity';
import { Column, Entity } from 'typeorm';

@Entity('expenses')
export class Expense extends CustomEntity {
  @Column()
  description: string;

  @Column()
  amount: number;

  @Column()
  date: Date;

  @Column()
  to_user: string;

  @Column()
  from_user: string;
}
