import { Router } from 'express';
import PERFIL from '../../constants/Perfil';
import TipoDeAccController from '../../controllers/TipoDeAccController';
import { verifyToken } from '../../middlewares/auth';
import { createACCTypeController } from '../../useCases/CreateACCType';
import { indexACCTypeController } from '../../useCases/IndexACCType';
import { showACCTypeController } from '../../useCases/ShowACCType';
import { deleteACCTypeController } from '../../useCases/DeleteACCType';
import { indexACCTypeWithUserPointsController } from '../../useCases/IndexACCTypeWithUserPoints';

const routes = Router();

routes.get(
  '/',
  verifyToken([PERFIL.DISCENTE, PERFIL.ADMINISTRADOR]),
  (req, res) => indexACCTypeController.handle(req, res),
);
routes.get('/:id', verifyToken([PERFIL.ADMINISTRADOR]), (req, res) =>
  showACCTypeController.handle(req, res),
);
routes.get('/user/:user_id', verifyToken([PERFIL.DISCENTE]), (req, res) =>
  indexACCTypeWithUserPointsController.handle(req, res),
);

routes.post('/', verifyToken([PERFIL.ADMINISTRADOR]), (req, res) =>
  createACCTypeController.handle(req, res),
);
routes.post(
  '/mass',
  verifyToken([PERFIL.ADMINISTRADOR]),
  TipoDeAccController.massCreate,
);

routes.delete('/:id', verifyToken([PERFIL.ADMINISTRADOR]), (req, res) =>
  deleteACCTypeController.handle(req, res),
);

routes.put(
  '/:id',
  verifyToken([PERFIL.ADMINISTRADOR]),
  TipoDeAccController.update,
);

export default routes;
