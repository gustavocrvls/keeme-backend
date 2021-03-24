import { IACCPoints } from '../../repositories/IPointsRepository';
import { IPointsCalculatorProvider } from '../IPointsCalculatorProvider';

export class PointsCalculatorProvider implements IPointsCalculatorProvider {
  // eslint-disable-next-line class-methods-use-this
  getPoints(data: IACCPoints[]): number {
    let accumulator = 0;
    data.forEach(row => {
      accumulator +=
        row.points > row.limit ? Number(row.limit) : Number(row.points);
    });

    return accumulator;
  }
}
