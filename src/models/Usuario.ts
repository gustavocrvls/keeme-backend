import { Entity, Column, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

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

  @JoinColumn({ name: 'id_curso' })
  id_curso: string;

  @JoinColumn({ name: 'id_perfil' })
  id_perfil: number;
}