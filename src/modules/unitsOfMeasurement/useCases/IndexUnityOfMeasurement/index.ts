import { ArrayPaginatorProvider } from '../../../../providers/implementations/ArrayPaginatorProvider';
import { MySQLUnityOfMeasurementRepository } from '../../repositories/implementations/MySQLUnitsOfMeasurementRepository';
import { IndexUnityOfMeasurementController } from './IndexUnityOfMeasurementController';
import { IndexUnityOfMeasurementUseCase } from './IndexUnityOfMeasurementUseCase';

const arrayPaginatorProvider = new ArrayPaginatorProvider();

const mySQLUnityOfMeasurementRepository = new MySQLUnityOfMeasurementRepository(
  arrayPaginatorProvider,
);

const indexUnityOfMeasurementUseCase = new IndexUnityOfMeasurementUseCase(
  mySQLUnityOfMeasurementRepository,
);

const indexUnityOfMeasurementController = new IndexUnityOfMeasurementController(
  indexUnityOfMeasurementUseCase,
);

export { indexUnityOfMeasurementUseCase, indexUnityOfMeasurementController };
