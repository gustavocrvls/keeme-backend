import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../../entities/User';

@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  public name: string;

  @OneToMany(() => User, user => user.profile, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'profile_id' })
  public users: User[];
}
