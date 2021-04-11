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

@Entity('acc_type')
export class ACCType {
  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @Column()
  public name: string;

  @Column()
  public point_limit: number;

  @Column()
  public description: string;

  @ManyToOne(
    () => UnityOfMeasurement,
    unityOfMeasurement => unityOfMeasurement.id,
  )
  @JoinColumn({ name: 'unity_of_measurement_id' })
  public unity_of_measurement: UnityOfMeasurement;

  @OneToMany(() => ACC, acc => acc.acc_type)
  @JoinColumn({ name: 'acc_id' })
  public accs: ACC[];

  @OneToMany(() => ACCVariant, accVariant => accVariant.acc_type, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'acc_type_id' })
  public acc_variants: ACCVariant[];

  constructor(props: Omit<ACCType, 'accs' | 'id' | 'pontuacao'>, id?: number) {
    Object.assign(this, props);
  }
}
