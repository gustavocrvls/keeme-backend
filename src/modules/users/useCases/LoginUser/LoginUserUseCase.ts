import { generateToken } from '../../../../config/authentication';
import { IUsersRepository } from '../../../../repositories/IUsersRepository';
import { ILoginUserDTO, ILoginUserResponse } from './LoginUserDTO';

export class LoginUserUseCase {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(data: ILoginUserDTO): Promise<ILoginUserResponse> {
    const user = await this.usersRepository.login(data);

    const token = generateToken(user.id, user.profile.id);

    return {
      token,
      auth: true,
      data: user,
    };
  }
}
