import { Router } from 'express';
import PERFIL from '../../constants/Perfil';
import AvaliacaoDaAccController from '../../controllers/AvaliacaoDaAccController';
import { verifyToken } from '../../middlewares/auth';

const routes = Router();

routes.get(
  '/',
  // verifyToken([PERFIL.ADMINISTRADOR]),
  AvaliacaoDaAccController.index,
);

routes.post(
  '/',
  // verifyToken([PERFIL.ADMINISTRADOR]),
  AvaliacaoDaAccController.create,
);

export default routes;
