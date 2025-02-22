import { PrismaClient } from '@prisma/client';
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
  private prismaClient: PrismaClient;

  constructor(arrayPaginator?: IArrayPaginatorProvider) {
    this.prismaClient = new PrismaClient();
    if (arrayPaginator) this.arrayPaginator = arrayPaginator;
  }

  async index(data: IIndexUnityOfMeasurementDTO): Promise<IPaginatedArray> {
    const { name, sortField, limit } = data;
    let { sortOrder, page } = data;

    if (!sortOrder) {
      sortOrder = 'ASC';
    }
    if (page !== undefined && page > 0) {
      page -= 1;
    }

    const filters = {
      where: {
        ...(name
          ? {
              name: {
                contains: `%${name}%`,
              },
            }
          : {}),
      },
      orderBy: {
        ...(sortField
          ? {
              [sortField]: sortOrder,
            }
          : {}),
      },
      ...(!Number.isNaN(limit) && !Number.isNaN(page)
        ? { take: limit, skip: page * limit }
        : {}),
    };

    const unitsOfMeasurement =
      await this.prismaClient.unity_of_measurement.findMany(filters);
    const total_items =
      await this.prismaClient.unity_of_measurement.count(filters);

    return this.arrayPaginator.paginate(
      unitsOfMeasurement,
      page + 1,
      limit,
      total_items,
    );
  }
}
