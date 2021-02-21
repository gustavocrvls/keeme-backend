import { Router } from 'express';
import PERFIL from '../../constants/Perfil';
import TipoDeAccController from '../../controllers/TipoDeAccController';
import { verifyToken } from '../../middlewares/auth';

const routes = Router();

routes.get(
  '/',
  verifyToken([PERFIL.DISCENTE, PERFIL.ADMINISTRADOR]),
  TipoDeAccController.index,
);
routes.get(
  '/usuario/:id',
  verifyToken([PERFIL.DISCENTE]),
  TipoDeAccController.getTiposDeAccByIdUsuario,
);

routes.post(
  '/',
  verifyToken([PERFIL.ADMINISTRADOR]),
  TipoDeAccController.create,
);
routes.post(
  '/mass',
  verifyToken([PERFIL.ADMINISTRADOR]),
  TipoDeAccController.massCreate,
);

routes.delete(
  '/:id',
  verifyToken([PERFIL.ADMINISTRADOR]),
  TipoDeAccController.delete,
);

export default routes;
