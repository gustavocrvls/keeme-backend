import { User } from '../../../../entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IShowUserDTO } from './ShowUserDTO';

export class ShowUserUseCase {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(data: IShowUserDTO): Promise<User> {
    const { id } = data;

    const user = await this.usersRepository.show(id);

    return user;
  }
}
