import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import Curso from './Curso';
import Perfil from './Perfil';
import Pontuacao from './Pontuacao';

@Entity('usuario')
export default class Usuario {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;

  @Column()
  sexo: number;

  @Column()
  username: string;

  @Column()
  senha: string;

  @ManyToOne(() => Curso, curso => curso.id)
  @JoinColumn({ name: 'id_curso' })
  curso: Curso;

  @ManyToOne(() => Perfil, perfil => perfil.id)
  @JoinColumn({ name: 'id_perfil' })
  perfil: Perfil;

  @OneToMany(() => Pontuacao, pontuacao => pontuacao.usuario)
  @JoinColumn({ name: 'id_usuario'})
  pontuacoes: Pontuacao[];
}