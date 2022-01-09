import { ILoginUserDTO } from '../../api/users/useCases/LoginUser/LoginUserDTO';
import { IExternalAuthenticationProvider } from '../IExternalAuthenticationProvider';

const users = [
  {
    username: 'gustavo.carvalho',
    password: 'pass1234',
  },
  {
    username: 'maria',
    password: 'pass1234',
  },
  {
    username: 'admin',
    password: 'pass1234',
  },
  {
    username: 'joao',
    password: 'pass1234',
  },
];

export class ExternalAuthenticationMock
  // eslint-disable-next-line prettier/prettier
  implements IExternalAuthenticationProvider {
  async login(data: ILoginUserDTO): Promise<boolean> {
    const { password, username } = data;

    const user = users.find(
      u => u.username === username && u.password === password,
    );

    if (user) return true;

    return false;
  }
}
