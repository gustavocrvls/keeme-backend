import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { UnityOfMeasurement } from './UnityOfMeasurement';
import { ACC } from './ACC';
import { ACCVariant } from './ACCVariant';

@Entity('tipo_de_acc')
export class ACCType {
  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @Column('nome')
  public name: string;

  @Column('limite_de_pontos')
  public point_limit: number;

  @Column('descricao')
  public description: string;

  @ManyToOne(
    () => UnityOfMeasurement,
    unityOfMeasurement => unityOfMeasurement.id,
  )
  @JoinColumn({ name: 'id_unidade_de_medida' })
  public unity_of_measurement: UnityOfMeasurement;

  @OneToMany(() => ACC, acc => acc.acc_type)
  @JoinColumn({ name: 'id_tipo_de_acc' })
  public accs: ACC[];

  @OneToMany(() => ACCVariant, accVariant => accVariant.acc_type, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'id_tipo_de_acc' })
  public acc_variants: ACCVariant[];

  constructor(
    props: Omit<ACCType, 'accs' | 'id' | 'pontuacao'>,
    id?: number,
    pontuacao?: number,
  ) {
    Object.assign(this, props);
  }
}
