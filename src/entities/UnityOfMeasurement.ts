import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ACCType } from './ACCType';

@Entity('unity_of_measurement')
export class UnityOfMeasurement {
  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @Column('nome')
  public name: string;

  @OneToMany(() => ACCType, accType => accType.unity_of_measurement)
  @JoinColumn({ name: 'unity_of_measurement_id' })
  public acc_types: ACCType[];
}
