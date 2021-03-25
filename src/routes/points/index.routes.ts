import { Router } from 'express';
import PERFIL from '../../constants/Perfil';
import { verifyToken } from '../../middlewares/auth';
import { getUserPointsController } from '../../useCases/GetUserPoints';

const routes = Router();

routes.get(
  '/:id',
  verifyToken([PERFIL.COORDENADOR, PERFIL.DISCENTE]),
  (request, response) => {
    return getUserPointsController.handle(request, response);
  },
);

export default routes;
