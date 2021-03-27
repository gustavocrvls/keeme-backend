import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ACCType } from './ACCType';

@Entity('unidade_de_medida')
export class UnityOfMeasurement {
  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @Column('nome')
  public name: string;

  @OneToMany(() => ACCType, accType => accType.unity_of_measurement)
  @JoinColumn({ name: 'id_unidade_de_medida' })
  public acc_types: ACCType[];
}
