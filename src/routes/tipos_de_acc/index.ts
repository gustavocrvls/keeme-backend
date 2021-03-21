import { Router } from 'express';
import PERFIL from '../../constants/Perfil';
import TipoDeAccController from '../../controllers/TipoDeAccController';
import { verifyToken } from '../../middlewares/auth';
import { createACCTypeController } from '../../useCases/CreateACCType';
import { indexACCTypeController } from '../../useCases/IndexACCType';
import { showACCTypeController } from '../../useCases/ShowACCType';

const routes = Router();

routes.get(
  '/',
  // verifyToken([PERFIL.DISCENTE, PERFIL.ADMINISTRADOR]),
  (req, res) => indexACCTypeController.handle(req, res),
);
routes.get(
  '/:id',
  // verifyToken([PERFIL.ADMINISTRADOR]),
  (req, res) => showACCTypeController.handle(req, res),
);
routes.get(
  '/usuario/:id',
  verifyToken([PERFIL.DISCENTE]),
  TipoDeAccController.getTiposDeAccByIdUsuario,
);

routes.post(
  '/',
  // verifyToken([PERFIL.ADMINISTRADOR]),
  (req, res) => createACCTypeController.handle(req, res),
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
