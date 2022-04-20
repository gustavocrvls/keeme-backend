import { getRepository, Like } from 'typeorm';
import { UnityOfMeasurement } from '../../model/UnityOfMeasurement';
import {
  IArrayPaginatorProvider,
  IPaginatedArray,
} from '../../../../providers/IArrayPaginatorProvider';
import { IIndexUnityOfMeasurementDTO } from '../../useCases/IndexUnityOfMeasurement/IndexUnityOfMeasurementDTO';
import { IUnitsOfMeasurementRepository } from '../IUnitsOfMeasurementRepository';

export class MySQLUnityOfMeasurementRepository
  implements IUnitsOfMeasurementRepository
{
  private arrayPaginator: IArrayPaginatorProvider;

  constructor(arrayPaginator?: IArrayPaginatorProvider) {
    if (arrayPaginator) this.arrayPaginator = arrayPaginator;
  }

  async index(data: IIndexUnityOfMeasurementDTO): Promise<IPaginatedArray> {
    const { name, sortField, limit } = data;
    let { sortOrder, page } = data;

    const unitsOfMeasurementRepository = getRepository(UnityOfMeasurement);
    let unitsOfMeasurementQuery =
      await unitsOfMeasurementRepository.createQueryBuilder(
        'unidades_de_medida',
      );

    if (name)
      unitsOfMeasurementQuery = unitsOfMeasurementQuery.where({
        name: Like(`%${name}%`),
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
