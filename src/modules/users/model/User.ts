import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Course } from '../../courses/model/Course';
import { Profile } from '../../profile/model/Profile';
import { ACC } from '../../accs/model/ACC';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @Column()
  public name: string;

  @Column()
  public registration: string;

  @Column()
  public email: string;

  @Column()
  public username: string;

  @Column()
  public password: string;

  @Column()
  public active: boolean;

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
    props: Omit<
      User,
      | 'id'
      | 'course'
      | 'profile'
      | 'created_at'
      | 'accs'
      | 'password'
      | 'active'
    >,
    id?: number,
  ) {
    Object.assign(this, props);
  }
}
