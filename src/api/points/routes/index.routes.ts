import { Router } from 'express';
import { PROFILE } from '../../../constants/Profile';
import { verifyToken } from '../../../middlewares/auth';
import { getUserPointsController } from '../useCases/GetUserPoints';

const pointsRoutes = Router();

pointsRoutes.get(
  '/:id',
  verifyToken([PROFILE.COORDINATOR, PROFILE.STUDENT]),
  (request, response) => {
    return getUserPointsController.handle(request, response);
  },
);

export { pointsRoutes };
