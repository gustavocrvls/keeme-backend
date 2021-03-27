import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { ACC } from './ACC';

@Entity('certificate')
export class Certificate {
  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @Column()
  public name: string;

  @Column()
  public size: number;

  @Column()
  public type: string;

  @Column()
  public file: Buffer;

  @OneToOne(() => ACC, acc => acc.id)
  @JoinColumn({ name: 'acc_id' })
  public acc: ACC;
}
