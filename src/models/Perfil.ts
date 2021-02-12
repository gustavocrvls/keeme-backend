import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import Usuario from './Usuario';

@Entity('perfil')
export default class Perfil {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;

  @OneToMany(() => Usuario, usuario => usuario.curso, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'id_perfil' })
  usuarios: Usuario[];
}
