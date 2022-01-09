import { ACC_STATUS } from '../../constants/ACCStatus';
import { IACCTypeWithUserACCs } from '../../repositories/IACCTypesRepository';
import { IACCPoints } from '../../modules/points/repositories/IPointsRepository';
import { IACCTypesWithUserPointsResponseDTO } from '../../modules/accTypes/useCases/IndexACCTypesWithUserPoints/IndexACCTypeWithUserPointsDTO';
import { IPointsCalculatorProvider } from '../IPointsCalculatorProvider';

export class PointsCalculatorProvider implements IPointsCalculatorProvider {
  getPoints(data: IACCPoints[]): number {
    let accumulator = 0;
    data.forEach(row => {
      accumulator +=
        row.points > row.limit ? Number(row.limit) : Number(row.points);
    });

    return accumulator;
  }

  getPointsByACCType(
    accTypesWithUserACC: IACCTypeWithUserACCs[],
  ): IACCTypesWithUserPointsResponseDTO[] {
    const calculatedACCTypes = accTypesWithUserACC.map(accType => {
      let approvedAcumulator = 0;
      let underAnalisysAcumulator = 0;
      accType.accs.forEach(acc => {
        if (acc.acc_status.id === ACC_STATUS.APPROVED)
          approvedAcumulator += acc.quantity * acc.acc_variant.points_per_unity;
        if (acc.acc_status.id === ACC_STATUS.UNDER_ANALYSIS)
          underAnalisysAcumulator +=
            acc.quantity * acc.acc_variant.points_per_unity;
      });
      return {
        id: accType.id,
        name: accType.name,
        description: accType.description,
        point_limit: accType.point_limit,
        unit_of_measurement: {
          id: accType.unity_of_measurement.id,
          name: accType.unity_of_measurement.name,
        },
        acc_variants: accType.acc_variants.map(variant => ({
          id: variant.id,
          description: variant.description,
          points_per_unity: variant.points_per_unity,
        })),
        approved_points:
          approvedAcumulator > accType.point_limit
            ? accType.point_limit
            : approvedAcumulator,
        points_under_analisys: underAnalisysAcumulator,
      };
    });

    return calculatedACCTypes as IACCTypesWithUserPointsResponseDTO[];
  }
}
