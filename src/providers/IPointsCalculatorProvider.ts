import { IACCTypeWithUserACCs } from '../repositories/IACCTypesRepository';
import { IACCPoints } from '../modules/points/repositories/IPointsRepository';
import { IACCTypesWithUserPointsResponseDTO } from '../modules/accTypes/useCases/IndexACCTypesWithUserPoints/IndexACCTypeWithUserPointsDTO';

export interface IPointsCalculatorProvider {
  getPoints(data: IACCPoints[]): number;
  getPointsByACCType(
    accTypesWithUserACC: IACCTypeWithUserACCs[],
  ): IACCTypesWithUserPointsResponseDTO[];
}
