import { getRepository, Like, Repository } from 'typeorm';
import TipoDeAcc from '../../models/TipoDeAcc';
import {
  IArrayPaginatorProvider,
  IPaginatedArray,
} from '../../providers/IArrayPaginatorProvider';
import { IIndexACCTypeRequestDTO } from '../../useCases/IndexACCType/IndexACCTypeDTO';
import { IACCTypesRepository } from '../IACCTypesRepository';

export class MySQLACCTypesRepository implements IACCTypesRepository {
  private coursesRepository: Repository<TipoDeAcc>;

  private arrayPaginator: IArrayPaginatorProvider;

  constructor(arrayPaginator: IArrayPaginatorProvider) {
    this.arrayPaginator = arrayPaginator;
  }

  async index(data: IIndexACCTypeRequestDTO): Promise<IPaginatedArray> {
    const { nome, sortField, limit } = data;
    let { sortOrder, page } = data;

    this.coursesRepository = getRepository(TipoDeAcc);
    let unitsOfMeasurementQuery = await this.coursesRepository.createQueryBuilder(
      'tipo_de_acc',
    );

    if (nome)
      unitsOfMeasurementQuery = unitsOfMeasurementQuery.where({
        nome: Like(`%${nome}%`),
      });
    if (!sortOrder) sortOrder = 'ASC';
    if (sortField)
      unitsOfMeasurementQuery = unitsOfMeasurementQuery.orderBy({
        [sortField]: sortOrder,
      });

    if (limit && limit !== undefined && page && page !== undefined) {
      if (page > 0) page -= 1;
      unitsOfMeasurementQuery = unitsOfMeasurementQuery
        .take(limit)
        .skip(page * limit);
    }

    const unitsOfMeasurement = await unitsOfMeasurementQuery
      .leftJoinAndSelect('tipo_de_acc.variantes_de_acc', 'variante_de_acc')
      .leftJoinAndSelect('tipo_de_acc.unidade_de_medida', 'unidade_de_medida')
      .getMany();
    const total_items = await unitsOfMeasurementQuery.getCount();

    return this.arrayPaginator.paginate(
      unitsOfMeasurement,
      page + 1,
      limit,
      total_items,
    );
  }
}
