import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import Acc from './Acc';
import Usuario from './Usuario';

@Entity('avaliacao_da_acc')
export default class AvaliacaoDaAcc {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  descricao: string;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => Acc, acc => acc.id)
  @JoinColumn({ name: 'id_acc' })
  acc: number;

  @ManyToOne(() => Usuario, usuario => usuario.id)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;
}