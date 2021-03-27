import { Router } from 'express';
import { PROFILE } from '../../constants/Profile';
import { verifyToken } from '../../middlewares/auth';
import { indexUnityOfMeasurementController } from '../../useCases/IndexUnityOfMeasurement';

const routes = Router();

routes.get('/', (req, res) =>
  indexUnityOfMeasurementController.handle(req, res),
);

export default routes;
