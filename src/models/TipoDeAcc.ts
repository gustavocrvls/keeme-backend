import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import UnidadeDeMedida from './UnidadeDeMedida';
import Acc from './Acc';

@Entity('tipo_de_acc')
export default class TipoDeAcc {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;

  @Column()
  pontos_por_unidade: number;

  @Column()
  limite_de_pontos: number;

  @Column()
  sobre: string;

  pontuacao: number;

  @ManyToOne(() => UnidadeDeMedida, unidadeDeMedida => unidadeDeMedida.id)
  @JoinColumn({ name: 'id_unidade_de_medida' })
  unidade_de_medida: UnidadeDeMedida;

  @OneToMany(() => Acc, acc => acc.tipo_de_acc)
  @JoinColumn({ name: 'id_tipo_de_acc' })
  accs: Acc[];
}
