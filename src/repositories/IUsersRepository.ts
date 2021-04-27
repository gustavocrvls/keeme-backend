import { IIndexUserRequestDTO } from '../modules/users/useCases/IndexUser/IndexUserDTO';
import { IUpdateUserRequestDTO } from '../modules/users/useCases/UpdateUser/UpdateUserDTO';
import { IPaginatedArray } from '../providers/IArrayPaginatorProvider';

export interface IUsersRepository {
  index(data: IIndexUserRequestDTO): Promise<IPaginatedArray>;
  update(user: IUpdateUserRequestDTO): Promise<void>;
}
