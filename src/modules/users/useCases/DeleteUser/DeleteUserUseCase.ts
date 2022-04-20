import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IDeleteUserDTO } from './DeleteUserDTO';

export class DeleteUserUseCase {
  private usersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(data: IDeleteUserDTO): Promise<void> {
    const user = data;
    await this.usersRepository.update({
      id: user.id,
      active: false,
    });
  }
}
