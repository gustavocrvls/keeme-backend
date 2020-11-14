import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import Curso from './Curso';
import Perfil from './Perfil';

@Entity('users')
export default class User {
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
}