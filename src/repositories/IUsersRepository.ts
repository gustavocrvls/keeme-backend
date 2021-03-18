import Usuario from '../models/Usuario';

export interface IUsersRepository {
  findByEmail(email: string): Promise<Usuario>;
  save(user: Usuario): Promise<void>;
}
