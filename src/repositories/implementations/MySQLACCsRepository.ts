import { getRepository, Like } from 'typeorm';
import { ACC } from '../../entities/ACC';
import { IShowACCDTO } from '../../modules/accs/useCases/ShowACC/ShowACCDTO';
import {
  IArrayPaginatorProvider,
  IPaginatedArray,
} from '../../providers/IArrayPaginatorProvider';
import { IDeleteACCRequestDTO } from '../../modules/accs/useCases/DeleteACC/DeleteACCDTO';
import { IIndexACCRequestDTO } from '../../modules/accs/useCases/IndexACC/IndexACCDTO';
import { IACCsRepository } from '../IACCsRepository';
import { IUpdatedACC } from '../../modules/accs/useCases/UpdateACC/UpdateACCDTO';

export class MySQLACCsRepository implements IACCsRepository {
  private arrayPaginator: IArrayPaginatorProvider;

  constructor(arrayPaginator?: IArrayPaginatorProvider) {
    if (arrayPaginator) this.arrayPaginator = arrayPaginator;
  }

  public async index(data: IIndexACCRequestDTO): Promise<IPaginatedArray> {
    const { name, sortField, limit, acc_status, acc_type, user, course } = data;
    let { sortOrder, page } = data;

    const accRepository = getRepository(ACC);
    let accsQuery = await accRepository.createQueryBuilder('acc');

    if (name)
      accsQuery = accsQuery.where({
        name: Like(`%${name}%`),
      });
    if (user)
      accsQuery = accsQuery.andWhere('user.id = :user', {
        user,
      });
    if (acc_status)
      accsQuery = accsQuery.andWhere('acc_status.id = :acc_status', {
        acc_status,
      });
    if (acc_type)
      accsQuery = accsQuery.andWhere('acc_type.id = :acc_type', {
        acc_type,
      });
    if (course)
      accsQuery = accsQuery.andWhere('course.id = :course', {
        course,
      });

    if (!sortOrder) sortOrder = 'ASC';
    if (sortField)
      accsQuery = accsQuery.orderBy({
        [`acc.${sortField}`]: sortOrder,
      });

    if (limit && limit !== undefined && page && page !== undefined) {
      if (page > 0) page -= 1;
      accsQuery = accsQuery.take(limit).skip(page * limit);
    }

    const accs = await accsQuery
      .leftJoinAndSelect('acc.user', 'user')
      .leftJoinAndSelect('user.course', 'course')
      .leftJoinAndSelect('acc.acc_status', 'acc_status')
      .leftJoinAndSelect('acc.acc_type', 'acc_type')
      .leftJoinAndSelect(
        'acc_type.unity_of_measurement',
        'unity_of_measurement',
      )
      .leftJoinAndSelect('acc.acc_variant', 'acc_variant')
      .leftJoinAndSelect('acc.acc_assessment', 'acc_assessment')
      .leftJoinAndSelect('acc_assessment.user', 'acc_assessment__user')
      .select([
        'acc',
        'acc_status',
        'acc_type',
        'unity_of_measurement',
        'acc_variant',
        'acc_assessment',
        'user.id',
        'user.name',
        'user.registration',
        'user.email',
        'acc_assessment__user.id',
        'acc_assessment__user.name',
        'acc_assessment__user.registration',
        'acc_assessment__user.email',
      ])
      .getMany();
    const total_items = await accsQuery.getCount();

    return this.arrayPaginator.paginate(accs, page + 1, limit, total_items);
  }

  public async show(data: IShowACCDTO): Promise<ACC> {
    const accRepository = getRepository(ACC);
    const { id } = data;

    const accsQuery = await accRepository.createQueryBuilder('acc');

    const acc = await accsQuery
      .leftJoinAndSelect('acc.acc_status', 'acc_status')
      .leftJoinAndSelect('acc.acc_type', 'acc_type')
      .leftJoinAndSelect('acc.acc_variant', 'acc_variant')
      .leftJoinAndSelect(
        'acc_type.unity_of_measurement',
        'unity_of_measurement',
      )
      .leftJoinAndSelect('acc.user', 'user')
      .leftJoinAndSelect('acc.acc_assessment', 'acc_assessment')
      .leftJoinAndSelect('acc_assessment.user', 'acc_assessment.user')
      .select([
        'acc',
        'acc_status',
        'acc_type',
        'acc_variant',
        'unity_of_measurement',
        'user.name',
        'acc_assessment',
        'acc_assessment.user',
      ])
      .where('acc.id = :id', { id })
      .getOneOrFail();

    return acc;
  }

  public async update(acc: IUpdatedACC): Promise<void> {
    const accRepository = getRepository(ACC);
    await accRepository.update({ id: acc.id }, acc);
  }

  public async delete(data: IDeleteACCRequestDTO): Promise<void> {
    const { id } = data;
    const accRepository = getRepository(ACC);

    await accRepository.delete({ id });
  }

  public async create(acc: ACC): Promise<void> {
    const accRepository = getRepository(ACC);

    await accRepository.save(acc);
  }
}
