import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Usuario from './Usuario';

@Entity('curso')
export default class Curso {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;

  @OneToMany(() => Usuario, usuario => usuario.curso, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'id_curso' })
  usuarios: Usuario[];
}