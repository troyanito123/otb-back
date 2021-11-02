import { CustomEntity } from 'src/modules/customEntity.entity';
import { Column, Entity } from 'typeorm';

@Entity('contributions')
export class Contribution extends CustomEntity {
  @Column()
  description: string;

  @Column()
  amount: number;
}
