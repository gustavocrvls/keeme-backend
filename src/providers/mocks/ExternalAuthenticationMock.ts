import { ILoginUserDTO } from '../../modules/users/useCases/LoginUser/LoginUserDTO';
import { IExternalAuthenticationProvider } from '../IExternalAuthenticationProvider';

const users = [
  {
    username: 'gustavo.carvalho',
    password: 'teste123',
  },
  {
    username: 'maria',
    password: 'teste123',
  },
  {
    username: 'admin',
    password: 'teste123',
  },
  {
    username: 'joao',
    password: 'teste123',
  },
];

export class ExternalAuthenticationMock
  implements IExternalAuthenticationProvider
{
  async login(data: ILoginUserDTO): Promise<boolean> {
    const { password, username } = data;

    const user = users.find(
      u => u.username === username && u.password === password,
    );

    if (user) return true;

    return false;
  }
}
