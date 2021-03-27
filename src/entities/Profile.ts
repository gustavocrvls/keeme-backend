import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './User';

@Entity('perfil')
export class Profile {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column('nome')
  public name: string;

  @OneToMany(() => User, user => user.profile, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'id_perfil' })
  public users: User[];
}
