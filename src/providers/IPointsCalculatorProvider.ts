import { IACCTypeWithUserACCs } from '../api/accTypes/repositories/IACCTypesRepository';
import { IACCPoints } from '../api/points/repositories/IPointsRepository';
import { IACCTypesWithUserPointsResponseDTO } from '../api/accTypes/useCases/IndexACCTypesWithUserPoints/IndexACCTypeWithUserPointsDTO';

export interface IPointsCalculatorProvider {
  getPoints(data: IACCPoints[]): number;
  getPointsByACCType(
    accTypesWithUserACC: IACCTypeWithUserACCs[],
  ): IACCTypesWithUserPointsResponseDTO[];
}
