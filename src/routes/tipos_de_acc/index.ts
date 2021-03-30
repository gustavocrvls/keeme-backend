import { Router } from 'express';
import { PROFILE } from '../../constants/Profile';
import TipoDeAccController from '../../controllers/TipoDeAccController';
import { verifyToken } from '../../middlewares/auth';
import { createACCTypeController } from '../../useCases/CreateACCType';
import { indexACCTypeController } from '../../useCases/IndexACCType';
import { showACCTypeController } from '../../useCases/ShowACCType';
import { deleteACCTypeController } from '../../useCases/DeleteACCType';
import { indexACCTypesWithUserPointsController } from '../../useCases/IndexACCTypesWithUserPoints';

const routes = Router();

routes.get(
  '/',
  verifyToken([PROFILE.STUDENT, PROFILE.ADMINISTRATOR]),
  (req, res) => indexACCTypeController.handle(req, res),
);
routes.get('/:id', verifyToken([PROFILE.ADMINISTRATOR]), (req, res) =>
  showACCTypeController.handle(req, res),
);
routes.get('/user/:user_id', verifyToken([PROFILE.STUDENT]), (req, res) =>
  indexACCTypesWithUserPointsController.handle(req, res),
);

routes.post('/', verifyToken([PROFILE.ADMINISTRATOR]), (req, res) =>
  createACCTypeController.handle(req, res),
);
routes.post(
  '/mass',
  verifyToken([PROFILE.ADMINISTRATOR]),
  TipoDeAccController.massCreate,
);

routes.delete('/:id', verifyToken([PROFILE.ADMINISTRATOR]), (req, res) =>
  deleteACCTypeController.handle(req, res),
);

routes.put(
  '/:id',
  verifyToken([PROFILE.ADMINISTRATOR]),
  TipoDeAccController.update,
);

export default routes;
