import { IUpdateUserRequestDTO } from '../modules/users/useCases/UpdateUser/UpdateUserDTO';

export interface IUsersRepository {
  update(user: IUpdateUserRequestDTO): Promise<void>;
}
