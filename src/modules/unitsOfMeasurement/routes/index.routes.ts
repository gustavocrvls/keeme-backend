import { Router } from 'express';
import { indexUnityOfMeasurementController } from '../../../useCases/IndexUnityOfMeasurement';

const unitsOfMeasurementRoutes = Router();

unitsOfMeasurementRoutes.get('/', (req, res) =>
  indexUnityOfMeasurementController.handle(req, res),
);

export { unitsOfMeasurementRoutes };
