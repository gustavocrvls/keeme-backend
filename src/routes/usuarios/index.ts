import { Router } from 'express';
import { PROFILE } from '../../constants/Profile';
import UsuarioController from '../../controllers/UsuarioController';
import { verifyToken } from '../../middlewares/auth';

const routes = Router();

routes.get(
  '/',
  // verifyToken([PROFILE.ADMINISTRADOR, PROFILE.COORDENADOR]),
  UsuarioController.index,
);
routes.get(
  '/:id',
  verifyToken([PROFILE.COORDINATOR, PROFILE.STUDENT]),
  UsuarioController.show,
);

routes.post(
  '/',
  verifyToken([PROFILE.ADMINISTRATOR]),
  UsuarioController.create,
);
routes.get(
  '/perfil/:id/cursos',
  verifyToken([PROFILE.ADMINISTRATOR]),
  UsuarioController.findByPerfilGroupByCurso,
);

routes.post('/create-discente', UsuarioController.createDiscente);

routes.post('/login', UsuarioController.login);
routes.delete('/:id', UsuarioController.delete);

export default routes;
