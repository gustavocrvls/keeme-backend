import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './User';

@Entity('curso')
export class Course {
  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @Column('nome')
  public name: string;

  @OneToMany(() => User, usuario => usuario.course, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'id_curso' })
  public users: User[];

  constructor(props: Omit<Course, 'users' | 'id'>, id?: number) {
    Object.assign(this, props);
  }
}
