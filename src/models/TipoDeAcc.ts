import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import UnidadeDeMedida from './UnidadeDeMedida';
import Pontuacao from './Pontuacao';

@Entity('tipo_de_acc')
export default class Curso {
  @PrimaryGeneratedColumn('increment')
  id: number;
  
  @Column()
  nome: string;

  @Column()
  pontos_por_unidade: number;

  @Column()
  limite_de_pontos: number;

  @Column()
  sobre: string;

  @ManyToOne(() => UnidadeDeMedida, unidadeDeMedida => unidadeDeMedida.id)
  @JoinColumn({ name: 'id_unidade_de_medida' })
  unidade_de_medida: UnidadeDeMedida;

  @OneToMany(() => Pontuacao, pontuacao => pontuacao.status_da_pontuacao)
  @JoinColumn({ name: 'id_status_da_pontuacao' })
  pontuacao: Pontuacao[];
}
