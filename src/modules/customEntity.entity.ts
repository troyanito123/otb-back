import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class CustomEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
