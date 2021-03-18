import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import Usuario from './Usuario';

@Entity('curso')
export default class Curso {
  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @Column()
  public nome: string;

  @OneToMany(() => Usuario, usuario => usuario.curso, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'id_curso' })
  public usuarios: Usuario[];

  constructor(props: Omit<Curso, 'usuarios' | 'id'>, id?: number) {
    Object.assign(this, props);
  }
}
