import axios from 'axios';
import { ILoginUserDTO } from '../../modules/users/useCases/LoginUser/LoginUserDTO';
import { IExternalAuthenticationProvider } from '../IExternalAuthenticationProvider';

export class SIGAuthenticationProvider
  implements IExternalAuthenticationProvider
{
  /**
   * @important
   * essa função deve ser reforatorada apontando para um endpoint de autenticação do sig
   * o retorno da função deverá ser um boolean com _true_ caso as informações estejam corretas
   * e _false_ caso não estejam
   *
   */
  async login(data: ILoginUserDTO): Promise<boolean> {
    const endpoint = process.env.SIG_ENDPOINT;

    const { password, username } = data;

    try {
      const response = await axios.post(`${endpoint}/login`, {
        password,
        username,
      });

      if (response.status === 200) return true;
    } catch {
      return false;
    }
    return false;
  }
}
