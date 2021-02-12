import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import TipoDeAcc from './TipoDeAcc';

@Entity('unidade_de_medida')
export default class UnidadeDeMedida {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;

  @OneToMany(() => TipoDeAcc, tipoDeAcc => tipoDeAcc.unidade_de_medida)
  @JoinColumn({ name: 'id_unidade_de_medida' })
  tipos_de_acc: TipoDeAcc[];
}
