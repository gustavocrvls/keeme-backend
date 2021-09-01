import { generateToken } from '../../../../config/authentication';
import { IExternalAuthenticationProvider } from '../../../../providers/IExternalAuthenticationProvider';
import { IUsersRepository } from '../../../../repositories/IUsersRepository';
import { ILoginUserDTO, ILoginUserResponse } from './LoginUserDTO';

export class LoginUserUseCase {
  private usersRepository: IUsersRepository;

  private externalAuthenticationProvider: IExternalAuthenticationProvider;

  constructor(
    usersRepository: IUsersRepository,
    externalAuthenticationProvider: IExternalAuthenticationProvider,
  ) {
    this.usersRepository = usersRepository;
    this.externalAuthenticationProvider = externalAuthenticationProvider;
  }

  async execute(data: ILoginUserDTO): Promise<ILoginUserResponse> {
    const authenticated = await this.externalAuthenticationProvider.login(data);

    if (authenticated) {
      const { username } = data;

      const user = await this.usersRepository.getUserByUsername(username);

      if (user?.id) {
        const token = generateToken(user.id, user.profile.id);

        return {
          token,
          auth: true,
          data: user,
        };
      }

      return {
        auth: true,
        data: user,
      };
    }

    const { username, password } = data;

    const user = await this.usersRepository.login({ username, password });

    if (user?.id) {
      const token = generateToken(user.id, user.profile.id);

      return {
        token,
        auth: true,
        data: user,
      };
    }

    throw new Error('Usuário ou senha incorretos!');
  }
}
