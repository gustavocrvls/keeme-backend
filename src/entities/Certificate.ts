import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { ACC } from './ACC';

@Entity('certificado')
export class Certificate {
  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @Column('nome')
  public name: string;

  @Column('tamanho')
  public size: number;

  @Column('tipo')
  public type: string;

  @Column('arquivo')
  public file: Buffer;

  @OneToOne(() => ACC, acc => acc.id)
  @JoinColumn({ name: 'id_acc' })
  public acc: ACC;
}
