import { getRepository, Like, Repository } from 'typeorm';
import { ACC } from '../../entities/ACC';
import {
  IShowACCWithUserRequestDTO,
  IShowACCWithUserResponseDTO,
} from '../../modules/accs/dtos/ShowACCWithUserDTO';
import { IShowACCDTO } from '../../modules/accs/useCases/ShowACC/ShowACCDTO';
import {
  IArrayPaginatorProvider,
  IPaginatedArray,
} from '../../providers/IArrayPaginatorProvider';
import { IDeleteACCRequestDTO } from '../../useCases/DeleteACC/DeleteACCDTO';
import { IIndexACCRequestDTO } from '../../useCases/IndexACC/IndexACCDTO';
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

    const acc = await this.accRepository.findOneOrFail(
      { id },
      {
        relations: [
          'acc_status',
          'acc_type',
          'acc_variant',
          'acc_type.unity_of_measurement',
          'certificate',
          'user',
          'acc_assessment',
          'acc_assessment.user',
        ],
      },
    );

    return acc;
  }

  public async delete(data: IDeleteACCRequestDTO): Promise<void> {
    const { id } = data;
    this.accRepository = getRepository(ACC);

    await this.accRepository.delete({ id });
  }

  public async getWithUser(data: IShowACCWithUserRequestDTO): Promise<any> {
    this.accRepository = getRepository(ACC);

    const { id } = data;

    const accWithUserQuery = this.accRepository.createQueryBuilder('acc');

    accWithUserQuery
      .leftJoinAndSelect('acc.acc_status', 'acc_status')
      .leftJoinAndSelect('acc.acc_type', 'acc_type')
      .leftJoinAndSelect(
        'acc_type.unity_of_measurement',
        'unity_of_measurement',
      )
      .leftJoinAndSelect('acc.usuario', 'usuario')
      .leftJoinAndSelect('usuario.perfil', 'perfil')
      .leftJoinAndSelect('usuario.curso', 'curso')
      .leftJoin('acc.certificado', 'certificado')
      .addSelect(['certificado.id'])
      .where({ usuario: { id } });

    const accWithUser = await accWithUserQuery.getOneOrFail();

    return accWithUser;
  }

  public async create(acc: ACC): Promise<void> {
    this.accRepository = getRepository(ACC);

    await this.accRepository.save(acc);
  }
}
