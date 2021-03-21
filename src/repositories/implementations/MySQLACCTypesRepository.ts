import { getRepository, Like, Repository } from 'typeorm';
import TipoDeAcc from '../../models/TipoDeAcc';
import {
  IArrayPaginatorProvider,
  IPaginatedArray,
} from '../../providers/IArrayPaginatorProvider';
import { IIndexACCTypeRequestDTO } from '../../useCases/IndexACCType/IndexACCTypeDTO';
import { IShowACCTypeDTO } from '../../useCases/ShowACCType/ShowACCTypeDTO';
import { IACCTypesRepository } from '../IACCTypesRepository';

export class MySQLACCTypesRepository implements IACCTypesRepository {
  private coursesRepository: Repository<TipoDeAcc>;

  private arrayPaginator: IArrayPaginatorProvider;

  constructor(arrayPaginator?: IArrayPaginatorProvider) {
    if (arrayPaginator) this.arrayPaginator = arrayPaginator;
  }

  public async index(data: IIndexACCTypeRequestDTO): Promise<IPaginatedArray> {
    const { nome, sortField, limit, unidade_de_medida } = data;
    let { sortOrder, page } = data;

    this.coursesRepository = getRepository(TipoDeAcc);
    let unitsOfMeasurementQuery = await this.coursesRepository.createQueryBuilder(
      'tipo_de_acc',
    );

    if (nome)
      unitsOfMeasurementQuery = unitsOfMeasurementQuery.where({
        nome: Like(`%${nome}%`),
      });
    if (unidade_de_medida)
      unitsOfMeasurementQuery = unitsOfMeasurementQuery.where({
        unidade_de_medida,
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

  public async show(data: IShowACCTypeDTO): Promise<TipoDeAcc> {
    const { id } = data;

    this.coursesRepository = getRepository(TipoDeAcc);

    const accType = await this.coursesRepository.findOneOrFail(id);

    return accType;
  }

  public async save(accType: TipoDeAcc): Promise<void> {
    this.coursesRepository = getRepository(TipoDeAcc);
    await this.coursesRepository.save(accType);
  }
}
