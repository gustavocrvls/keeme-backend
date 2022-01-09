import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { ACCType } from '../../accTypes/model/ACCType';
import { ACCStatus } from '../../accStatus/model/ACCStatus';
import { User } from '../../../entities/User';
import { ACCVariant } from '../../../entities/ACCVariant';
import { ACCAssessment } from '../../accsAssessments/model/ACCAssessment';

@Entity('acc')
export class ACC {
  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @Column()
  public quantity: number;

  @Column()
  public description: string;

  @Column()
  public certificate: string;

  @Column({ type: 'timestamp' })
  public created_at: Date;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @ManyToOne(() => ACCStatus, accStatus => accStatus.id)
  @JoinColumn({ name: 'acc_status_id' })
  public acc_status: ACCStatus;

  @ManyToOne(() => ACCType, accType => accType.id)
  @JoinColumn({ name: 'acc_type_id' })
  public acc_type: ACCType;

  @ManyToOne(() => ACCVariant, accVariant => accVariant.id)
  @JoinColumn({ name: 'acc_variant_id' })
  public acc_variant: ACCVariant;

  @OneToOne(() => ACCAssessment, acc_assessment => acc_assessment.acc)
  public acc_assessment: ACCAssessment;

  constructor(
    props: Omit<
      ACC,
      | 'id'
      | 'certificate'
      | 'acc_assessment'
      | 'created_at'
      | 'acc_status'
      | 'acc_type'
      | 'user'
      | 'acc_variant'
    >,
    id?: number,
  ) {
    Object.assign(this, props);
  }
}
