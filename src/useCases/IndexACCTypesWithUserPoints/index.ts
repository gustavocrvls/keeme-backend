import { ArrayPaginatorProvider } from '../../providers/implementations/ArrayPaginatorProvider';
import { PointsCalculatorProvider } from '../../providers/implementations/PointsCalculatorProvider';
import { MySQLACCTypesRepository } from '../../repositories/implementations/MySQLACCTypesRepository';
import { IndexACCTypeWithUserPointsController } from './IndexACCTypeWithUserPointsController';
import { IndexACCTypeWithUserPointsUseCase } from './IndexACCTypeWithUserPointsUseCase';

const pointsCalculatorProvider = new PointsCalculatorProvider();

const mySQLACCTypesRepository = new MySQLACCTypesRepository();

const arrayPaginatorProvider = new ArrayPaginatorProvider();

const indexACCTypeWithUserPointsUseCase = new IndexACCTypeWithUserPointsUseCase(
  mySQLACCTypesRepository,
  pointsCalculatorProvider,
  arrayPaginatorProvider,
);

const indexACCTypesWithUserPointsController = new IndexACCTypeWithUserPointsController(
  indexACCTypeWithUserPointsUseCase,
);

export {
  indexACCTypeWithUserPointsUseCase,
  indexACCTypesWithUserPointsController,
};
