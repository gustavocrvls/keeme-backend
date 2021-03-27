import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import UnidadeDeMedida from './UnidadeDeMedida';
import { ACC } from '../entities/ACC';
import VarianteDeAcc from './VarianteDaACC';

@Entity('tipo_de_acc')
export default class TipoDeAcc {
  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @Column()
  public nome: string;

  @Column()
  public limite_de_pontos: number;

  @Column()
  public descricao: string;

  public pontuacao: number;

  @ManyToOne(() => UnidadeDeMedida, unidadeDeMedida => unidadeDeMedida.id)
  @JoinColumn({ name: 'id_unidade_de_medida' })
  public unidade_de_medida: UnidadeDeMedida;

  @OneToMany(() => ACC, acc => acc.tipo_de_acc)
  @JoinColumn({ name: 'id_tipo_de_acc' })
  public accs: ACC[];

  @OneToMany(() => VarianteDeAcc, varianteDeAcc => varianteDeAcc.tipo_de_acc, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'id_tipo_de_acc' })
  public variantes_de_acc: VarianteDeAcc[];

  constructor(
    props: Omit<TipoDeAcc, 'accs' | 'id' | 'pontuacao'>,
    id?: number,
    pontuacao?: number,
  ) {
    Object.assign(this, props);
  }
}
