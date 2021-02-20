import { Router } from 'express';
import PERFIL from '../../constants/Perfil';
import UsuarioController from '../../controllers/UsuarioController';
import { verifyToken } from '../../middlewares/auth';

const routes = Router();

routes.get('/', verifyToken([PERFIL.ADMINISTRADOR]), UsuarioController.index);
routes.get(
  '/:id',
  verifyToken([PERFIL.COORDENADOR, PERFIL.DISCENTE]),
  UsuarioController.show,
);
routes.get(
  '/perfil/:id/cursos',
  verifyToken([PERFIL.ADMINISTRADOR]),
  UsuarioController.findByPerfilGroupByCurso,
);

routes.post('/', UsuarioController.create);
routes.post('/login', UsuarioController.login);

export default routes;
