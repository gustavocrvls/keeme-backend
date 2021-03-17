import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import Curso from './Curso';
import Perfil from './Perfil';
import Acc from './Acc';

@Entity('usuario')
export default class Usuario {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;

  @Column()
  usuario: string;

  @Column()
  cpf: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @ManyToOne(() => Curso, curso => curso.id)
  @JoinColumn({ name: 'id_curso' })
  curso: Curso;

  @ManyToOne(() => Perfil, perfil => perfil.id)
  @JoinColumn({ name: 'id_perfil' })
  perfil: Perfil;

  @OneToMany(() => Acc, acc => acc.usuario)
  @JoinColumn({ name: 'id_usuario' })
  accs: Acc[];
}
