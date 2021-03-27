import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Course } from './Course';
import { Profile } from './Profile';
import { ACC } from './ACC';

@Entity('usuario')
export class User {
  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @Column('nome')
  public name: string;

  @Column('username')
  public username: string;

  @Column('cpf')
  public cpf: string;

  @Column('email')
  public email: string;

  @Column('senha')
  public password: string;

  @ManyToOne(() => Course, course => course.id)
  @JoinColumn({ name: 'id_curso' })
  public course: Course;

  @ManyToOne(() => Profile, profile => profile.id)
  @JoinColumn({ name: 'id_perfil' })
  public profile: Profile;

  @OneToMany(() => ACC, acc => acc.user)
  @JoinColumn({ name: 'id_usuario' })
  public accs: ACC[];
}
