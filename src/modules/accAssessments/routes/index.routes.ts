import { Router } from 'express';
import { PROFILE } from '../../../constants/Profile';
import AvaliacaoDaAccController from '../../../controllers/AvaliacaoDaAccController';
import { verifyToken } from '../../../middlewares/auth';

const accAssessmentsRoutes = Router();

accAssessmentsRoutes.get(
  '/',
  verifyToken([PROFILE.ADMINISTRATOR]),
  AvaliacaoDaAccController.index,
);

accAssessmentsRoutes.post(
  '/',
  verifyToken([PROFILE.ADMINISTRATOR]),
  AvaliacaoDaAccController.create,
);

export { accAssessmentsRoutes };
