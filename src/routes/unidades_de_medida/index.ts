import { Router } from 'express';
import PERFIL from '../../constants/Perfil';
import UnidadeDeMedidaController from '../../controllers/UnidadeDeMedidaController';
import { verifyToken } from '../../middlewares/auth';

const routes = Router();

routes.get(
  '/',
  verifyToken([PERFIL.ADMINISTRADOR]),
  UnidadeDeMedidaController.index,
);

export default routes;
