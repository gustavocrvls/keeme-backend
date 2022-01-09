import { ILoginUserDTO } from '../modules/users/useCases/LoginUser/LoginUserDTO';

export interface IExternalAuthenticationProvider {
  login(data: ILoginUserDTO): Promise<boolean>;
}
