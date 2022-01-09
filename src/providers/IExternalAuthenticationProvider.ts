import { ILoginUserDTO } from '../api/users/useCases/LoginUser/LoginUserDTO';

export interface IExternalAuthenticationProvider {
  login(data: ILoginUserDTO): Promise<boolean>;
}
