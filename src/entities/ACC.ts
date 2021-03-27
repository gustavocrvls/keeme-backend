import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { ACCType } from './ACCType';
import { ACCStatus } from './ACCStatus';
import { User } from './User';
import { Certificate } from './Certificate';
import { ACCVariant } from './ACCVariant';
import { ACCAssessment } from './ACCAssessment';

@Entity('acc')
export class ACC {
  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @Column('quantidade')
  public quantity: number;

  @Column('descricao')
  public description: number;

  @Column({ name: 'criado_em', type: 'timestamp' })
  public created_at: Date;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'id_usuario' })
  public user: User;

  @ManyToOne(() => ACCStatus, accStatus => accStatus.id)
  @JoinColumn({ name: 'id_status_da_acc' })
  public acc_status: ACCStatus;

  @ManyToOne(() => ACCType, accType => accType.id)
  @JoinColumn({ name: 'id_tipo_de_acc' })
  public acc_type: ACCType;

  @ManyToOne(() => ACCVariant, accVariant => accVariant.id)
  @JoinColumn({ name: 'id_variante_de_acc' })
  public acc_variant: ACCVariant;

  @OneToOne(() => Certificate, certificate => certificate.acc, {
    cascade: true,
    eager: true,
  })
  public certificate: Certificate;

  @OneToOne(() => ACCAssessment, acc_assessment => acc_assessment.acc)
  public acc_assessment: ACCAssessment;
}
