import { getRepository, Like, Repository } from 'typeorm';
import { UnityOfMeasurement } from '../../entities/UnityOfMeasurement';
import {
  IArrayPaginatorProvider,
  IPaginatedArray,
} from '../../providers/IArrayPaginatorProvider';
import { IIndexUnityOfMeasurementDTO } from '../../useCases/IndexUnityOfMeasurement/IndexUnityOfMeasurementDTO';
import { IUnitsOfMeasurementRepository } from '../IUnitsOfMeasurementRepository';

export class MySQLUnityOfMeasurementRepository
  implements IUnitsOfMeasurementRepository {
  private coursesRepository: Repository<UnityOfMeasurement>;

  private arrayPaginator: IArrayPaginatorProvider;

  constructor(arrayPaginator?: IArrayPaginatorProvider) {
    if (arrayPaginator) this.arrayPaginator = arrayPaginator;
  }

  async index(data: IIndexUnityOfMeasurementDTO): Promise<IPaginatedArray> {
    const { nome, sortField, limit } = data;
    let { sortOrder, page } = data;

    this.coursesRepository = getRepository(UnityOfMeasurement);
    let unitsOfMeasurementQuery = await this.coursesRepository.createQueryBuilder(
      'unidades_de_medida',
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

    const unitsOfMeasurement = await unitsOfMeasurementQuery.getMany();
    const total_items = await unitsOfMeasurementQuery.getCount();

    return this.arrayPaginator.paginate(
      unitsOfMeasurement,
      page + 1,
      limit,
      total_items,
    );
  }
}
