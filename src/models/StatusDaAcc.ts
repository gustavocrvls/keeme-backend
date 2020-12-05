import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Acc from './Acc';

@Entity('status_da_acc')
export default class StatusDaAcc {
  @PrimaryGeneratedColumn('increment')
  id: number;
  
  @Column()
  nome: string;

  @OneToMany(() => Acc, acc => acc.status_da_acc)
  @JoinColumn({ name: 'id_status_da_acc' })
  accs: Acc[];
}