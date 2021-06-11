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

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @Column()
  public name: string;

  @Column()
  public cpf: string;

  @Column()
  public email: string;

  @Column()
  public username: string;

  @Column()
  public password: string;

  @ManyToOne(() => Course, course => course.id)
  @JoinColumn({ name: 'course_id' })
  public course: Course;

  @ManyToOne(() => Profile, profile => profile.id)
  @JoinColumn({ name: 'profile_id' })
  public profile: Profile;

  @OneToMany(() => ACC, acc => acc.user)
  @JoinColumn({ name: 'user_id' })
  public accs: ACC[];

  constructor(
    props: Omit<User, 'id' | 'course' | 'profile' | 'created_at' | 'accs'>,
    id?: number,
  ) {
    Object.assign(this, props);
  }
}
