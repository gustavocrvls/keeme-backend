import { getRepository, Like, Repository } from 'typeorm';
import { User } from '../../entities/User';
import { IIndexUserRequestDTO } from '../../modules/users/useCases/IndexUser/IndexUserDTO';
import { IUpdateUserRequestDTO } from '../../modules/users/useCases/UpdateUser/UpdateUserDTO';
import {
  IArrayPaginatorProvider,
  IPaginatedArray,
} from '../../providers/IArrayPaginatorProvider';
import { IUsersRepository } from '../IUsersRepository';

export class MySQLUsersRepository implements IUsersRepository {
  private usersRepository: Repository<User>;

  private arrayPaginator: IArrayPaginatorProvider;

  constructor(arrayPaginator?: IArrayPaginatorProvider) {
    if (arrayPaginator) this.arrayPaginator = arrayPaginator;
  }

  async index(data: IIndexUserRequestDTO): Promise<IPaginatedArray> {
    const { profile, course, search, sortField, limit } = data;
    let { sortOrder, page } = data;

    this.usersRepository = getRepository(User);
    let usersQuery = await this.usersRepository.createQueryBuilder('user');

    if (search)
      if (Number(search))
        usersQuery = usersQuery.where({ cpf: Like(`%${search}%`) });
      else usersQuery = usersQuery.where({ name: Like(`%${search}%`) });

    if (profile)
      usersQuery = usersQuery.andWhere('user.profile = :profile', {
        profile,
      });

    if (course)
      usersQuery = usersQuery.andWhere('user.course = :course', {
        course,
      });

    if (!sortOrder) sortOrder = 'ASC';
    if (sortField)
      usersQuery = usersQuery.orderBy({
        [`user.${sortField}`]: sortOrder,
      });

    if (limit && limit !== undefined && page && page !== undefined) {
      if (page > 0) page -= 1;
      usersQuery = usersQuery.take(limit).skip(page * limit);
    }

    const users = await usersQuery
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.course', 'course')
      .select([
        'user.id',
        'user.name',
        'user.cpf',
        'user.email',
        'user.username',
        'profile',
        'course',
      ])
      .getMany();

    const total_items = await usersQuery.getCount();

    return this.arrayPaginator.paginate(users, page + 1, limit, total_items);
  }

  async update(user: IUpdateUserRequestDTO): Promise<void> {
    this.usersRepository = getRepository(User);

    await this.usersRepository.update({ id: user.id }, user);
  }
}
