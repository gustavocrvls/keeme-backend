import { PointsCalculatorProvider } from '../../providers/implementations/PointsCalculatorProvider';
import { MySQLACCTypesRepository } from '../../repositories/implementations/MySQLACCTypesRepository';
import { IndexACCTypeWithUserPointsController } from './IndexACCTypeWithUserPointsController';
import { IndexACCTypeWithUserPointsUseCase } from './IndexACCTypeWithUserPointsUseCase';

const pointsCalculatorProvider = new PointsCalculatorProvider();

const mySQLACCTypesRepository = new MySQLACCTypesRepository();

const indexACCTypeWithUserPointsUseCase = new IndexACCTypeWithUserPointsUseCase(
  mySQLACCTypesRepository,
  pointsCalculatorProvider,
);

const indexACCTypeWithUserPointsController = new IndexACCTypeWithUserPointsController(
  indexACCTypeWithUserPointsUseCase,
);

export {
  indexACCTypeWithUserPointsUseCase,
  indexACCTypeWithUserPointsController,
};
