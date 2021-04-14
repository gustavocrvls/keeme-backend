import { getRepository, Repository } from 'typeorm';
import { User } from '../../entities/User';
import { IUpdateUserRequestDTO } from '../../modules/users/useCases/UpdateUser/UpdateUserDTO';
import { IUsersRepository } from '../IUsersRepository';

export class MySQLUsersRepository implements IUsersRepository {
  private usersRepository: Repository<User>;

  async update(user: IUpdateUserRequestDTO): Promise<void> {
    this.usersRepository = getRepository(User);

    await this.usersRepository.update({ id: user.id }, user);
  }
}
