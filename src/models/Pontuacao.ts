import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import TipoDeAcc from './TipoDeAcc';
import StatusDaPontuacao from './StatusDaPontuacao';
import Usuario from './Usuario';

@Entity('tipo_de_acc')
export default class Curso {
  @PrimaryGeneratedColumn('increment')
  id: number;
  
  @Column()
  ativa: boolean;

  @Column()
  quantidade: number;

  @Column()
  sobre: number;

  @ManyToOne(() => Usuario, usuario => usuario.id)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @ManyToOne(() => StatusDaPontuacao, statusDaPontuacao => statusDaPontuacao.id)
  @JoinColumn({ name: 'id_status_da_pontuacao' })
  status_da_pontuacao: StatusDaPontuacao;

  @ManyToOne(() => TipoDeAcc, tipoDeAcc => tipoDeAcc.id)
  @JoinColumn({ name: 'id_tipo_de_acc' })
  tipo_de_acc: TipoDeAcc;
}
