import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ACCType } from './ACCType';

@Entity('variante_de_acc')
export class ACCVariant {
  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @Column('descricao')
  public description: string;

  @Column('pontos_por_unidade')
  public points_per_unity: number;

  @ManyToOne(() => ACCType, accType => accType.id)
  @JoinColumn({ name: 'id_tipo_de_acc' })
  public acc_type: ACCType;
}
