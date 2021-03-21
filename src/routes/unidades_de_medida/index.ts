import { Router } from 'express';
import PERFIL from '../../constants/Perfil';
import { verifyToken } from '../../middlewares/auth';
import { indexUnityOfMeasurementController } from '../../useCases/IndexUnityOfMeasurement';

const routes = Router();

routes.get('/', (req, res) =>
  indexUnityOfMeasurementController.handle(req, res),
);

export default routes;
