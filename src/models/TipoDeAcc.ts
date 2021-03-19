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
import VarianteDeAcc from './VarianteDaACC';

@Entity('tipo_de_acc')
export default class TipoDeAcc {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;

  @Column()
  limite_de_pontos: number;

  @Column()
  descricao: string;

  pontuacao: number;

  @ManyToOne(() => UnidadeDeMedida, unidadeDeMedida => unidadeDeMedida.id)
  @JoinColumn({ name: 'id_unidade_de_medida' })
  unidade_de_medida: UnidadeDeMedida;

  @OneToMany(() => Acc, acc => acc.tipo_de_acc)
  @JoinColumn({ name: 'id_tipo_de_acc' })
  accs: Acc[];

  @OneToMany(() => VarianteDeAcc, varianteDeAcc => varianteDeAcc.tipo_de_acc, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'id_tipo_de_acc' })
  variantes_de_acc: VarianteDeAcc[];
}
