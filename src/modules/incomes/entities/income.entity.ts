import { CustomEntity } from 'src/modules/customEntity.entity';
import { GenericStatus } from 'src/modules/genericStatus';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'incomes' })
export class Income extends CustomEntity {
  @Column()
  amount: number;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column({ enum: GenericStatus, default: GenericStatus.ACTIVE })
  status: GenericStatus;

  @ManyToOne(() => User, (user) => user.incomes)
  user: User;
}
