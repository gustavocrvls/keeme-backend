import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Pontuacao from './Pontuacao';

@Entity('status_da_pontuacao')
export default class Curso {
  @PrimaryGeneratedColumn('increment')
  id: number;
  
  @Column()
  nome: string;

  @OneToMany(() => Pontuacao, pontuacao => pontuacao.status_da_pontuacao)
  @JoinColumn({ name: 'id_status_da_pontuacao' })
  pontuacao: Pontuacao[];
}