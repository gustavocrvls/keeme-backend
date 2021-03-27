import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ACC } from './ACC';

@Entity('status_da_acc')
export class ACCStatus {
  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @Column('nome')
  public name: string;

  @OneToMany(() => ACC, acc => acc.acc_status)
  @JoinColumn({ name: 'id_status_da_acc' })
  public accs: ACC[];
}
