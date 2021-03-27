import { Router } from 'express';
import { PROFILE } from '../../constants/Profile';
import AvaliacaoDaAccController from '../../controllers/AvaliacaoDaAccController';
import { verifyToken } from '../../middlewares/auth';

const routes = Router();

routes.get(
  '/',
  verifyToken([PROFILE.ADMINISTRATOR]),
  AvaliacaoDaAccController.index,
);

routes.post(
  '/',
  verifyToken([PROFILE.ADMINISTRATOR]),
  AvaliacaoDaAccController.create,
);

export default routes;
