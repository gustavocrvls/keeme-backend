/* eslint-disable class-methods-use-this */
import { ACC_STATUS } from '../../constants/ACCStatus';
import { IACCTypeWithUserACCs } from '../../repositories/IACCTypesRepository';
import { IACCPoints } from '../../repositories/IPointsRepository';
import { IACCTypesWithUserPointsResponseDTO } from '../../useCases/IndexACCTypesWithUserPoints/IndexACCTypeWithUserPointsDTO';
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
        if (acc.status_da_acc.id === ACC_STATUS.APPROVED)
          approvedAcumulator +=
            acc.quantidade * acc.variante_de_acc.pontos_por_unidade;
        if (acc.status_da_acc.id === ACC_STATUS.UNDER_ANALYSIS)
          underAnalisysAcumulator +=
            acc.quantidade * acc.variante_de_acc.pontos_por_unidade;
      });
      return {
        id: accType.id,
        name: accType.nome,
        description: accType.descricao,
        point_limit: accType.limite_de_pontos,
        unit_of_measurement: {
          id: accType.unidade_de_medida.id,
          name: accType.unidade_de_medida.nome,
        },
        acc_variants: accType.variantes_de_acc.map(variante => ({
          id: variante.id,
          description: variante.descricao,
          points_per_unity: variante.pontos_por_unidade,
        })),
        approved_points:
          approvedAcumulator > accType.limite_de_pontos
            ? accType.limite_de_pontos
            : approvedAcumulator,
        points_under_analisys: underAnalisysAcumulator,
      };
    });

    return calculatedACCTypes as IACCTypesWithUserPointsResponseDTO[];
  }
}
