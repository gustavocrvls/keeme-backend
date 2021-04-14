import { getRepository, Like, Repository } from 'typeorm';
import { ACCType } from '../../entities/ACCType';
import {
  IArrayPaginatorProvider,
  IPaginatedArray,
} from '../../providers/IArrayPaginatorProvider';
import { IDeleteACCTypeRequestDTO } from '../../modules/accTypes/useCases/DeleteACCType/DeleteACCTypeDTO';
import { IIndexACCTypeRequestDTO } from '../../modules/accTypes/useCases/IndexACCType/IndexACCTypeDTO';
import { IIndexACCTypesWithUserPointsRequestDTO } from '../../modules/accTypes/useCases/IndexACCTypesWithUserPoints/IndexACCTypeWithUserPointsDTO';
import { IShowACCTypeDTO } from '../../modules/accTypes/useCases/ShowACCType/ShowACCTypeDTO';
import {
  IACCsLength,
  IACCTypesRepository,
  IACCTypeWithUserACCs,
} from '../IACCTypesRepository';
import { IUpdateACCTypeRequestDTO } from '../../modules/accTypes/useCases/UpdateACCType/UpdateACCTypeDTO';

export class MySQLACCTypesRepository implements IACCTypesRepository {
  private accTypeRepository: Repository<ACCType>;

  private arrayPaginator: IArrayPaginatorProvider;

  constructor(arrayPaginator?: IArrayPaginatorProvider) {
    if (arrayPaginator) this.arrayPaginator = arrayPaginator;
  }

  public async index(data: IIndexACCTypeRequestDTO): Promise<IPaginatedArray> {
    const { name, sortField, limit, unity_of_measurement } = data;
    let { sortOrder, page } = data;

    this.accTypeRepository = getRepository(ACCType);
    let unitsOfMeasurementQuery = await this.accTypeRepository.createQueryBuilder(
      'acc_type',
    );

    if (name)
      unitsOfMeasurementQuery = unitsOfMeasurementQuery.where({
        name: Like(`%${name}%`),
      });
    if (unity_of_measurement)
      unitsOfMeasurementQuery = unitsOfMeasurementQuery.where({
        unity_of_measurement,
      });

    if (!sortOrder) sortOrder = 'ASC';
    if (sortField)
      unitsOfMeasurementQuery = unitsOfMeasurementQuery.orderBy({
        [`acc_type.${sortField}`]: sortOrder,
      });

    if (limit && limit !== undefined && page && page !== undefined) {
      if (page > 0) page -= 1;
      unitsOfMeasurementQuery = unitsOfMeasurementQuery
        .take(limit)
        .skip(page * limit);
    }

    const unitsOfMeasurement = await unitsOfMeasurementQuery
      .leftJoinAndSelect('acc_type.acc_variants', 'acc_variant')
      .leftJoinAndSelect(
        'acc_type.unity_of_measurement',
        'unity_of_measurement',
      )
      .getMany();
    const total_items = await unitsOfMeasurementQuery.getCount();

    return this.arrayPaginator.paginate(
      unitsOfMeasurement,
      page + 1,
      limit,
      total_items,
    );
  }

  public async show(data: IShowACCTypeDTO): Promise<ACCType> {
    const { id } = data;

    this.accTypeRepository = getRepository(ACCType);

    const accType = await this.accTypeRepository.findOneOrFail(id, {
      relations: ['unity_of_measurement'],
    });

    return accType;
  }

  public async save(accType: ACCType): Promise<void> {
    this.accTypeRepository = getRepository(ACCType);
    await this.accTypeRepository.save(accType);
  }

  public async delete(data: IDeleteACCTypeRequestDTO): Promise<void> {
    const { id } = data;

    this.accTypeRepository = getRepository(ACCType);

    await this.accTypeRepository.delete({ id });
  }

  public async getACCsLength(data: IACCsLength): Promise<number> {
    const { id } = data;

    this.accTypeRepository = getRepository(ACCType);

    const accTypes = await this.accTypeRepository
      .createQueryBuilder('acc_type')
      .leftJoin('acc_type.accs', 'accs')
      .select('COUNT(accs.id) as accs_length')
      .where({ id })
      .getRawOne();

    return accTypes.accs_length;
  }

  public async getACCTypeByUser(
    data: IIndexACCTypesWithUserPointsRequestDTO,
  ): Promise<IACCTypeWithUserACCs[]> {
    const { user_id, name, sortField, limit } = data;
    let { sortOrder, page } = data;

    this.accTypeRepository = getRepository(ACCType);

    let accTypeQuery = this.accTypeRepository
      .createQueryBuilder('acc_type')
      .leftJoinAndSelect(
        'acc_type.unity_of_measurement',
        'unity_of_measurement',
      )
      .leftJoinAndSelect('acc_type.accs', 'acc', 'acc.user.id = :user_id', {
        user_id,
      })
      .leftJoinAndSelect('acc.acc_variant', 'acc.acc__variant')
      .leftJoinAndSelect('acc_type.acc_variants', 'acc_type.acc_variants')
      .leftJoinAndSelect('acc.acc_status', 'acc_status')
      .select([
        'acc_type',
        'acc_status',
        'unity_of_measurement',
        'acc.id',
        'acc.quantity',
        'acc.acc__variant',
        // 'acc.acc_variant.points_per_unity',
        'acc_type.acc_variants',
      ]);
    if (name)
      accTypeQuery = accTypeQuery.where('acc_type.name LIKE :name', {
        name: `%${name}%`,
      });

    if (!sortOrder) sortOrder = 'ASC';
    if (sortField)
      accTypeQuery = accTypeQuery.orderBy({
        [`acc_type.${sortField}`]: sortOrder,
      });

    if (limit && limit !== undefined && page && page !== undefined) {
      if (page > 0) page -= 1;
      accTypeQuery = accTypeQuery.take(limit).skip(page * limit);
    }

    const accTypes = await accTypeQuery.getMany();

    return accTypes as IACCTypeWithUserACCs[];
  }

  public async getACCTypesLength(): Promise<number> {
    this.accTypeRepository = getRepository(ACCType);

    const accTypesLength = await this.accTypeRepository
      .createQueryBuilder('acc_type')
      .getCount();

    return accTypesLength;
  }

  public async update(accType: IUpdateACCTypeRequestDTO): Promise<void> {
    this.accTypeRepository = getRepository(ACCType);
    await this.accTypeRepository.update({ id: accType.id }, accType);
  }
}
