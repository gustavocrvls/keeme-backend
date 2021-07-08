import crypto from 'crypto';
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

    const userByRegistration = await this.usersRepository.getByField({
      field: 'registration',
      param: data.registration,
    });

    if (userByRegistration)
      throw new Error('Already exists a user with this registration.');

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

    const password = crypto
      .createHash('md5')
      .update(data.password)
      .digest('hex');

    const userData = {
      ...data,
      password,
    };

    await this.usersRepository.create(new User(userData));
  }
}
