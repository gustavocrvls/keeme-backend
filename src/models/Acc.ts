import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import TipoDeAcc from './TipoDeAcc';
import StatusDaAcc from './StatusDaAcc';
import Usuario from './Usuario';
import Certificado from './Certificado';

@Entity('acc')
export default class Acc {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  quantidade: number;

  @Column()
  sobre: number;

  @Column()
  id_certificado: number;

  @ManyToOne(() => Usuario, usuario => usuario.id)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @ManyToOne(() => StatusDaAcc, statusDaAcc => statusDaAcc.id)
  @JoinColumn({ name: 'id_status_da_acc' })
  status_da_acc: StatusDaAcc;

  @ManyToOne(() => TipoDeAcc, tipoDeAcc => tipoDeAcc.id)
  @JoinColumn({ name: 'id_tipo_de_acc' })
  tipo_de_acc: TipoDeAcc;
  
  @OneToOne(() => Certificado, certificado => certificado.id, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'id_certificado' })
  certificado: Certificado;
}
