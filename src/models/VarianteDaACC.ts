import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import TipoDeAcc from './TipoDeAcc';

@Entity('variante_de_acc')
export default class VarianteDeAcc {
  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @Column()
  public descricao: string;

  @Column()
  public pontos_por_unidade: number;

  @ManyToOne(() => TipoDeAcc, tipoDeAcc => tipoDeAcc.id)
  @JoinColumn({ name: 'id_tipo_de_acc' })
  public tipo_de_acc: TipoDeAcc;
}
