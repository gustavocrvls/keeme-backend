import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('curso')
export default class Curso {
  @PrimaryGeneratedColumn('increment')
  id: number;
  
  @Column()
  nome: string;
}