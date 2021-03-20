import { MySQLUnityOfMeasurementRepository } from '../../repositories/implementations/MySQLUnitsOfMeasurementRepository';
import { IndexUnityOfMeasurementController } from './IndexUnityOfMeasurementController';
import { IndexUnityOfMeasurementUseCase } from './IndexUnityOfMeasurementUseCase';

const mySQLUnityOfMeasurementRepository = new MySQLUnityOfMeasurementRepository();

const indexUnityOfMeasurementUseCase = new IndexUnityOfMeasurementUseCase(
  mySQLUnityOfMeasurementRepository,
);

const indexUnityOfMeasurementController = new IndexUnityOfMeasurementController(
  indexUnityOfMeasurementUseCase,
);

export { indexUnityOfMeasurementUseCase, indexUnityOfMeasurementController };
