import { getRepository, Like, Repository } from 'typeorm';
import { ACC } from '../../entities/ACC';
import { IShowACCDTO } from '../../modules/accs/useCases/ShowACC/ShowACCDTO';
import {
  IArrayPaginatorProvider,
  IPaginatedArray,
} from '../../providers/IArrayPaginatorProvider';
import { IDeleteACCRequestDTO } from '../../modules/accs/useCases/DeleteACC/DeleteACCDTO';
import { IIndexACCRequestDTO } from '../../modules/accs/useCases/IndexACC/IndexACCDTO';
import { IACCsRepository } from '../IACCsRepository';

export class MySQLACCsRepository implements IACCsRepository {
  private accRepository: Repository<ACC>;

  private arrayPaginator: IArrayPaginatorProvider;

  constructor(arrayPaginator?: IArrayPaginatorProvider) {
    if (arrayPaginator) this.arrayPaginator = arrayPaginator;
  }

  public async index(data: IIndexACCRequestDTO): Promise<IPaginatedArray> {
    const { name, sortField, limit, acc_status, acc_type, user } = data;
    let { sortOrder, page } = data;

    this.accRepository = getRepository(ACC);
    let accsQuery = await this.accRepository.createQueryBuilder('acc');

    if (name)
      accsQuery = accsQuery.where({
        name: Like(`%${name}%`),
      });
    if (user)
      accsQuery = accsQuery.where({
        user,
      });
    if (acc_status)
      accsQuery = accsQuery.where({
        acc_status,
      });
    if (acc_type)
      accsQuery = accsQuery.where({
        acc_type,
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
      .leftJoinAndSelect('acc.acc_status', 'acc_status')
      .leftJoinAndSelect('acc.acc_type', 'acc_type')
      .leftJoinAndSelect(
        'acc_type.unity_of_measurement',
        'unity_of_measurement',
      )
      .leftJoinAndSelect('acc.acc_variant', 'acc_variant')
      .leftJoinAndSelect('acc.acc_assessment', 'acc_assessment')
      .leftJoinAndSelect('acc_assessment.user', 'avaliacao_da_acc__usuario')
      .getMany();
    const total_items = await accsQuery.getCount();

    return this.arrayPaginator.paginate(accs, page + 1, limit, total_items);
  }

  public async show(data: IShowACCDTO): Promise<ACC> {
    this.accRepository = getRepository(ACC);
    const { id } = data;

    const accsQuery = await this.accRepository.createQueryBuilder('acc');

    const acc = await accsQuery
      .leftJoinAndSelect('acc.acc_status', 'acc_status')
      .leftJoinAndSelect('acc.acc_type', 'acc_type')
      .leftJoinAndSelect('acc.acc_variant', 'acc_variant')
      .leftJoinAndSelect(
        'acc_type.unity_of_measurement',
        'unity_of_measurement',
      )
      .leftJoinAndSelect('acc.certificate', 'certificate')
      .leftJoinAndSelect('acc.user', 'user')
      .leftJoinAndSelect('acc.acc_assessment', 'acc_assessment')
      .leftJoinAndSelect('acc_assessment.user', 'acc_assessment.user')
      .select([
        'acc',
        'certificate.id',
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

  public async delete(data: IDeleteACCRequestDTO): Promise<void> {
    const { id } = data;
    this.accRepository = getRepository(ACC);

    await this.accRepository.delete({ id });
  }

  public async create(acc: ACC): Promise<void> {
    this.accRepository = getRepository(ACC);

    await this.accRepository.save(acc);
  }
}
