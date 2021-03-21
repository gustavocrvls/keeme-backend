import { Router } from 'express';
import PERFIL from '../../constants/Perfil';
import TipoDeAccController from '../../controllers/TipoDeAccController';
import { verifyToken } from '../../middlewares/auth';
import { indexACCTypeController } from '../../useCases/IndexACCType';

const routes = Router();

routes.get(
  '/',
  // verifyToken([PERFIL.DISCENTE, PERFIL.ADMINISTRADOR]),
  (req, res) => indexACCTypeController.handle(req, res),
);
routes.get(
  '/:id',
  verifyToken([PERFIL.ADMINISTRADOR]),
  TipoDeAccController.show,
);
routes.get(
  '/usuario/:id',
  verifyToken([PERFIL.DISCENTE]),
  TipoDeAccController.getTiposDeAccByIdUsuario,
);

routes.post(
  '/',
  // verifyToken([PERFIL.ADMINISTRADOR]),
  TipoDeAccController.create,
);
routes.post(
  '/mass',
  // verifyToken([PERFIL.ADMINISTRADOR]),
  TipoDeAccController.massCreate,
);

routes.delete(
  '/:id',
  verifyToken([PERFIL.ADMINISTRADOR]),
  TipoDeAccController.delete,
);

routes.put(
  '/:id',
  verifyToken([PERFIL.ADMINISTRADOR]),
  TipoDeAccController.update,
);

export default routes;
