import { Router } from 'express';
import PERFIL from '../../constants/Perfil';
import UsuarioController from '../../controllers/UsuarioController';
import { verifyToken } from '../../middlewares/auth';

const routes = Router();

routes.get(
  '/',
  // verifyToken([PERFIL.ADMINISTRADOR, PERFIL.COORDENADOR]),
  UsuarioController.index,
);
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

routes.post('/', verifyToken([PERFIL.ADMINISTRADOR]), UsuarioController.create);
routes.post('/create-discente', UsuarioController.createDiscente);

routes.post('/login', UsuarioController.login);
routes.delete('/:id', UsuarioController.delete);

export default routes;
