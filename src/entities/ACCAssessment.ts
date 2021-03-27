import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { ACC } from './ACC';
import { User } from './User';

@Entity('avaliacao_da_acc')
export class ACCAssessment {
  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @Column('descricao')
  public description: string;

  @Column({ name: 'criado_em', type: 'timestamp' })
  public criated_at: Date;

  @OneToOne(() => ACC, acc => acc.id)
  @JoinColumn({ name: 'id_acc' })
  public acc: ACC;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'id_usuario' })
  public user: User;
}
