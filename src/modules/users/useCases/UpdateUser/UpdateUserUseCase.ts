import crypto from 'crypto';
import { IUsersRepository } from '../../../../repositories/IUsersRepository';
import { IUpdateUserRequestDTO } from './UpdateUserDTO';

export class UpdateUserUseCase {
  private usersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(data: IUpdateUserRequestDTO): Promise<void> {
    const user = data;
    if (user.password)
      user.password = crypto
        .createHash('md5')
        .update(user.password)
        .digest('hex');

    await this.usersRepository.update(user);
  }
}
