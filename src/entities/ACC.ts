import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import TipoDeAcc from '../models/TipoDeAcc';
import StatusDaAcc from '../models/StatusDaAcc';
import Usuario from '../models/Usuario';
import Certificado from '../models/Certificado';
import VarianteDeAcc from '../models/VarianteDaACC';
import AvaliacaoDaAcc from '../models/AvaliacaoDaAcc';

@Entity('acc')
export class ACC {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  quantidade: number;

  @Column()
  descricao: number;

  @Column({ type: 'timestamp' })
  criado_em: Date;

  @ManyToOne(() => Usuario, usuario => usuario.id)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @ManyToOne(() => StatusDaAcc, statusDaAcc => statusDaAcc.id)
  @JoinColumn({ name: 'id_status_da_acc' })
  status_da_acc: StatusDaAcc;

  @ManyToOne(() => TipoDeAcc, tipoDeAcc => tipoDeAcc.id)
  @JoinColumn({ name: 'id_tipo_de_acc' })
  tipo_de_acc: TipoDeAcc;

  @ManyToOne(() => VarianteDeAcc, varianteDeAcc => varianteDeAcc.id)
  @JoinColumn({ name: 'id_variante_de_acc' })
  variante_de_acc: VarianteDeAcc; /// ///// CORRIGIR NOME

  @OneToOne(() => Certificado, certificado => certificado.acc, {
    cascade: true,
    eager: true,
  })
  // @JoinColumn({ name: 'id_acc' })
  certificado: Certificado;

  @OneToOne(() => AvaliacaoDaAcc, avaliacaoDaAcc => avaliacaoDaAcc.acc)
  public avaliacao_da_acc: AvaliacaoDaAcc;
}
