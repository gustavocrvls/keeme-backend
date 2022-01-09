import { ACC_STATUS } from '../../../../constants/ACCStatus';
import { IPointsCalculatorProvider } from '../../../../providers/IPointsCalculatorProvider';
import { IPointsRepository } from '../../repositories/IPointsRepository';
import {
  IGetUserPointsRequestDTO,
  IGetUserPointsResponseDTO,
} from './GetUserPointsDTO';

export class GetUserPointsUseCase {
  private pointsRepository: IPointsRepository;

  private pointsCalculatorProvider: IPointsCalculatorProvider;

  public constructor(
    pointsRepository: IPointsRepository,
    pointsCalculatorProvider: IPointsCalculatorProvider,
  ) {
    this.pointsCalculatorProvider = pointsCalculatorProvider;
    this.pointsRepository = pointsRepository;
  }

  public async execute(
    data: IGetUserPointsRequestDTO,
  ): Promise<IGetUserPointsResponseDTO> {
    const { id } = data;

    const approvedACCPoints = await this.pointsRepository.getPointsByStatus({
      user_id: id,
      status_id: ACC_STATUS.APPROVED,
    });
    const underAnalysisACCPoints =
      await this.pointsRepository.getPointsByStatus({
        user_id: id,
        status_id: ACC_STATUS.UNDER_ANALYSIS,
      });
    const failedPointsACCPoints = await this.pointsRepository.getPointsByStatus(
      {
        user_id: id,
        status_id: ACC_STATUS.FAILED,
      },
    );

    const approved_points = await this.pointsCalculatorProvider.getPoints(
      approvedACCPoints,
    );
    const under_analysis = await this.pointsCalculatorProvider.getPoints(
      underAnalysisACCPoints,
    );
    const failed_points = await this.pointsCalculatorProvider.getPoints(
      failedPointsACCPoints,
    );

    return {
      approved_points,
      under_analysis,
      failed_points,
    };
  }
}
