import {
  IArrayPaginatorProvider,
  IPaginatedArray,
} from '../../../../providers/IArrayPaginatorProvider';
import { IPointsCalculatorProvider } from '../../../../providers/IPointsCalculatorProvider';
import { IACCTypesRepository } from '../../repositories/IACCTypesRepository';
import {
  IACCTypesWithUserPointsResponseDTO,
  IIndexACCTypesWithUserPointsRequestDTO,
} from './IndexACCTypeWithUserPointsDTO';

export class IndexACCTypeWithUserPointsUseCase {
  private accTypesRepository: IACCTypesRepository;

  private pointsCalculatorProvider: IPointsCalculatorProvider;

  private arrayPaginatorProvider: IArrayPaginatorProvider;

  constructor(
    accTypesRepository: IACCTypesRepository,
    pointsCalculatorProvider: IPointsCalculatorProvider,
    arrayPaginatorProvider: IArrayPaginatorProvider,
  ) {
    this.accTypesRepository = accTypesRepository;
    this.pointsCalculatorProvider = pointsCalculatorProvider;
    this.arrayPaginatorProvider = arrayPaginatorProvider;
  }

  public async execute(
    data: IIndexACCTypesWithUserPointsRequestDTO,
  ): Promise<IPaginatedArray> {
    const { limit, page } = data;

    const accTypesByUser = await this.accTypesRepository.getACCTypeByUser(data);

    const accTypesWithUserPoints =
      this.pointsCalculatorProvider.getPointsByACCType(accTypesByUser);

    const accTypesLength = await this.accTypesRepository.getACCTypesLength();

    const paginatedACCTypesWithUserPoints =
      this.arrayPaginatorProvider.paginate(
        accTypesWithUserPoints,
        page,
        limit,
        accTypesLength,
      );

    return paginatedACCTypesWithUserPoints;
  }
}
