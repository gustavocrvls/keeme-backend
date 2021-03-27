import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ACC } from '../entities/ACC';

@Entity('status_da_acc')
export default class StatusDaAcc {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;

  @OneToMany(() => ACC, acc => acc.status_da_acc)
  @JoinColumn({ name: 'id_status_da_acc' })
  accs: ACC[];
}
