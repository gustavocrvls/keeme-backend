import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../../entities/User';

@Entity('course')
export class Course {
  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @Column()
  public name: string;

  @OneToMany(() => User, usuario => usuario.course, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'course_id' })
  public users: User[];

  constructor(props: Omit<Course, 'users' | 'id'>, id?: number) {
    Object.assign(this, props);
  }
}
