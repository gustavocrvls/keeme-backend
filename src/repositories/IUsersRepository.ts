import { User } from '../entities/User';
import { IIndexUserRequestDTO } from '../modules/users/useCases/IndexUser/IndexUserDTO';
import { IUpdateUserRequestDTO } from '../modules/users/useCases/UpdateUser/UpdateUserDTO';
import { IPaginatedArray } from '../providers/IArrayPaginatorProvider';

export interface IGetByFieldData {
  field: 'email' | 'cpf' | 'username';
  param: string;
}

export interface IUsersRepository {
  index(data: IIndexUserRequestDTO): Promise<IPaginatedArray>;
  create(user: User): Promise<void>;
  update(user: IUpdateUserRequestDTO): Promise<void>;
  show(id: number): Promise<User>;
  // delete(id: number): Promise<void>;

  getUserByUsername(username: string): Promise<User>;
  getByField(data: IGetByFieldData): Promise<User | undefined>;
}
