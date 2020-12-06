import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import Acc from './Acc';

@Entity('certificado')
export default class Certificado {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;

  @Column()
  tamanho: number;
  
  @Column()
  tipo: string;
  
  @Column()
  arquivo: Buffer;
  
  @Column()
  id_acc: number;

  @OneToOne(() => Acc, acc => acc.id)
  @JoinColumn({ name: 'id_acc' })
  acc: Acc;
}
