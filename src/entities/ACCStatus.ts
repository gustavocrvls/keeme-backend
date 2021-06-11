import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ACC } from './ACC';

@Entity('acc_status')
export class ACCStatus {
  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @Column()
  public name: string;

  @OneToMany(() => ACC, acc => acc.acc_status)
  @JoinColumn({ name: 'acc_status_id' })
  public accs: ACC[];

  constructor(props: Omit<ACCStatus, 'id' | 'name' | 'accs'>, id?: number) {
    if (id) {
      Object.assign(this, { ...props, id });
    } else {
      Object.assign(this, props);
    }
  }
}
