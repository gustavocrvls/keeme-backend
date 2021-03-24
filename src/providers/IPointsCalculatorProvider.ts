import { IACCPoints } from '../repositories/IPointsRepository';

export interface IPointsCalculatorProvider {
  getPoints(data: IACCPoints[]): number;
}
