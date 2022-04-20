import { PointsCalculatorProvider } from '../PointsCalculatorProvider';

const pointsCalculatorProvider = new PointsCalculatorProvider();

describe('Points Calculator Provider', () => {
  it(`the points can't be greater than limit`, () => {
    const accPoints = [{ limit: 10, points: 50, status_id: 1 }];
    const points = pointsCalculatorProvider.getPoints(accPoints);

    expect(points).toBe(10);
  });

  it(`should calculate the points correctly`, () => {
    const accPoints = [
      {
        limit: 10,
        points: 50,
        status_id: 1,
      },
      {
        limit: 15,
        points: 20,
        status_id: 1,
      },
      {
        limit: 10,
        points: 5,
        status_id: 1,
      },
    ];
    const points = pointsCalculatorProvider.getPoints(accPoints);

    expect(points).toBe(30);
  });
});
