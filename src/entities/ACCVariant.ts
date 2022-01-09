import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ACCType } from '../modules/accTypes/model/ACCType';

@Entity('acc_variant')
export class ACCVariant {
  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @Column()
  public description: string;

  @Column()
  public points_per_unity: number;

  @ManyToOne(() => ACCType, accType => accType.id)
  @JoinColumn({ name: 'acc_type_id' })
  public acc_type: ACCType;

  constructor(props: Omit<ACCVariant, 'id'>, id?: number) {
    Object.assign(this, props);
  }
}
