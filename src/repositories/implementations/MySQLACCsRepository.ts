import { getRepository, Like, Repository } from 'typeorm';
import Acc from '../../models/Acc';
import {
  IArrayPaginatorProvider,
  IPaginatedArray,
} from '../../providers/IArrayPaginatorProvider';
import { IIndexACCRequestDTO } from '../../useCases/IndexACC/IndexACCDTO';
import { IACCsRepository } from '../IACCsRepository';

export class MySQLACCsRepository implements IACCsRepository {
  private accRepository: Repository<Acc>;

  private arrayPaginator: IArrayPaginatorProvider;

  constructor(arrayPaginator?: IArrayPaginatorProvider) {
    if (arrayPaginator) this.arrayPaginator = arrayPaginator;
  }

  async index(data: IIndexACCRequestDTO): Promise<IPaginatedArray> {
    const {
      nome,
      sortField,
      limit,
      status_da_acc,
      tipo_de_acc,
      usuario,
    } = data;
    let { sortOrder, page } = data;

    this.accRepository = getRepository(Acc);
    let accsQuery = await this.accRepository.createQueryBuilder('acc');

    if (nome)
      accsQuery = accsQuery.where({
        nome: Like(`%${nome}%`),
      });
    if (usuario)
      accsQuery = accsQuery.where({
        usuario,
      });
    if (status_da_acc)
      accsQuery = accsQuery.where({
        status_da_acc,
      });
    if (tipo_de_acc)
      accsQuery = accsQuery.where({
        tipo_de_acc,
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
      .leftJoinAndSelect('acc.usuario', 'usuario')
      .leftJoinAndSelect('acc.status_da_acc', 'status_da_acc')
      .leftJoinAndSelect('acc.tipo_de_acc', 'tipo_de_acc')
      .leftJoinAndSelect('tipo_de_acc.unidade_de_medida', 'unidade_de_medida')
      .leftJoinAndSelect('acc.variante_de_acc', 'variante_de_acc')
      .leftJoinAndSelect('acc.avaliacao_da_acc', 'avaliacao_da_acc')
      .leftJoinAndSelect(
        'avaliacao_da_acc.usuario',
        'avaliacao_da_acc__usuario',
      )
      .getMany();
    const total_items = await accsQuery.getCount();

    return this.arrayPaginator.paginate(accs, page + 1, limit, total_items);
  }
}
