import { User } from '../model/User';
import { IIndexUserRequestDTO } from '../useCases/IndexUser/IndexUserDTO';
import { ILoginUserDTO } from '../useCases/LoginUser/LoginUserDTO';
import { IUpdateUserRequestDTO } from '../useCases/UpdateUser/UpdateUserDTO';
import { IPaginatedArray } from '../../../providers/IArrayPaginatorProvider';

export interface IGetByFieldData {
  field: 'email' | 'registration' | 'username';
  param: string;
}

export interface IUsersRepository {
  index(data: IIndexUserRequestDTO): Promise<IPaginatedArray>;
  create(user: User): Promise<User>;
  update(user: IUpdateUserRequestDTO): Promise<void>;
  show(id: number): Promise<User>;

  login(data: ILoginUserDTO): Promise<User>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getByField(data: IGetByFieldData): Promise<User | undefined>;
}
