import STATUS_DA_ACC from '../../constants/StatusDaAcc';
import { IPointsCalculatorProvider } from '../../providers/IPointsCalculatorProvider';
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
      status_id: STATUS_DA_ACC.APPROVED,
    });
    const underAnalysisACCPoints = await this.pointsRepository.getPointsByStatus(
      {
        user_id: id,
        status_id: STATUS_DA_ACC.UNDER_ANALYSIS,
      },
    );
    const failedPointsACCPoints = await this.pointsRepository.getPointsByStatus(
      {
        user_id: id,
        status_id: STATUS_DA_ACC.FAILED,
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

/**
 *   approved_points: number;
  under_analysis: number;
  failed_points: number;
 */
