import { IPointsCalculatorProvider } from '../../providers/IPointsCalculatorProvider';
import { IACCTypesRepository } from '../../repositories/IACCTypesRepository';
import {
  IACCTypesWithUserPointsResponseDTO,
  IIndexACCTypesWithUserPointsRequestDTO,
} from './IndexACCTypeWithUserPointsDTO';

export class IndexACCTypeWithUserPointsUseCase {
  private accTypesRepository: IACCTypesRepository;

  private pointsCalculatorProvider: IPointsCalculatorProvider;

  constructor(
    accTypesRepository: IACCTypesRepository,
    pointsCalculatorProvider: IPointsCalculatorProvider,
  ) {
    this.accTypesRepository = accTypesRepository;
    this.pointsCalculatorProvider = pointsCalculatorProvider;
  }

  public async execute(
    data: IIndexACCTypesWithUserPointsRequestDTO,
  ): Promise<IACCTypesWithUserPointsResponseDTO[]> {
    const accTypesByUser = await this.accTypesRepository.getACCTypeByUser(data);

    const accTypesWithUserPoints = this.pointsCalculatorProvider.getPointsByACCType(
      accTypesByUser,
    );

    return accTypesWithUserPoints;
  }
}
