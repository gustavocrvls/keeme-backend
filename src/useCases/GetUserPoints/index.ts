import { PointsCalculatorProvider } from '../../providers/implementations/PointsCalculatorProvider';
import { MySQLPointsRepository } from '../../repositories/implementations/MySQLPointsRepository';
import { GetUserPointsController } from './GetUserPointsController';
import { GetUserPointsUseCase } from './GetUserPointsUseCase';

const mySQLPointsRepository = new MySQLPointsRepository();
const pointsCalculatorProvider = new PointsCalculatorProvider();

const getUserPointsUseCase = new GetUserPointsUseCase(
  mySQLPointsRepository,
  pointsCalculatorProvider,
);

const getUserPointsController = new GetUserPointsController(
  getUserPointsUseCase,
);

export { getUserPointsUseCase, getUserPointsController };
