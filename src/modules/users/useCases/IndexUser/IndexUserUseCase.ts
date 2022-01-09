import { IPaginatedArray } from '../../../../providers/IArrayPaginatorProvider';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IIndexUserRequestDTO } from './IndexUserDTO';

export class IndexUserUseCase {
  private usersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(data: IIndexUserRequestDTO): Promise<IPaginatedArray> {
    const users = await this.usersRepository.index(data);
    return users;
  }
}
