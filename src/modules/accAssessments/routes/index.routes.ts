import { Router } from 'express';
import { PROFILE } from '../../../constants/Profile';
import AvaliacaoDaAccController from '../../../controllers/AvaliacaoDaAccController';
import { verifyToken } from '../../../middlewares/auth';

const accAssessmentsRoutes = Router();

accAssessmentsRoutes.get(
  '/',
  verifyToken([PROFILE.ADMINISTRATOR, PROFILE.COORDINATOR]),
  AvaliacaoDaAccController.index,
);

accAssessmentsRoutes.post(
  '/',
  verifyToken([PROFILE.ADMINISTRATOR, PROFILE.COORDINATOR]),
  AvaliacaoDaAccController.create,
);

export { accAssessmentsRoutes };
