import { User } from '../entities/User';
import { IIndexUserRequestDTO } from '../modules/users/useCases/IndexUser/IndexUserDTO';
import { ILoginUserDTO } from '../modules/users/useCases/LoginUser/LoginUserDTO';
import { IUpdateUserRequestDTO } from '../modules/users/useCases/UpdateUser/UpdateUserDTO';
import { IPaginatedArray } from '../providers/IArrayPaginatorProvider';

export interface IUsersRepository {
  index(data: IIndexUserRequestDTO): Promise<IPaginatedArray>;
  update(user: IUpdateUserRequestDTO): Promise<void>;
  show(id: number): Promise<User>;

  login(data: ILoginUserDTO): Promise<User>;
}
