import { PROFILE } from '../../../../constants/Profile';
import { User } from '../../../../entities/User';
import { IUsersRepository } from '../../../../repositories/IUsersRepository';
import { IToken } from '../../../../utils/jwt';
import { ICreateUserDTO } from './CreateUserDTO';

export class CreateUserUseCase {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(data: ICreateUserDTO, token?: IToken): Promise<void> {
    if (
      data.profile === PROFILE.ADMINISTRATOR ||
      data.profile === PROFILE.COORDINATOR
    ) {
      if (Number(token?.profile) !== PROFILE.ADMINISTRATOR) {
        throw new Error(
          'The creation of a user with this profile is not allowed with this token!',
        );
      }
    }

    const userByCPF = await this.usersRepository.getByField({
      field: 'cpf',
      param: data.cpf,
    });

    if (userByCPF) throw new Error('Already exists a user with this CPF.');

    const userByEmail = await this.usersRepository.getByField({
      field: 'email',
      param: data.email,
    });

    if (userByEmail) throw new Error('Already exists a user with this e-mail.');

    const userByUsername = await this.usersRepository.getByField({
      field: 'username',
      param: data.username,
    });

    if (userByUsername)
      throw new Error('Already exists a user with this username');

    this.usersRepository.create(new User(data));
  }
}
