import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('perfil')
export default class Curso {
  @PrimaryGeneratedColumn('increment')
  id: number;
  
  @Column()
  nome: string;
}