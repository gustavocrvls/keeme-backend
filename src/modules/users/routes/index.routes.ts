import { Router } from 'express';
import { PROFILE } from '../../../constants/Profile';
import UsuarioController from '../../../controllers/UsuarioController';
import { verifyToken } from '../../../middlewares/auth';
import { updateUserController } from '../useCases/UpdateUser';

const usersRoutes = Router();

usersRoutes.get(
  '/',
  // verifyToken([PROFILE.ADMINISTRADOR, PROFILE.COORDENADOR]),
  UsuarioController.index,
);

usersRoutes.get(
  '/:id',
  verifyToken([PROFILE.COORDINATOR, PROFILE.STUDENT]),
  UsuarioController.show,
);

usersRoutes.post(
  '/',
  verifyToken([PROFILE.ADMINISTRATOR]),
  UsuarioController.create,
);

usersRoutes.put('/:id', verifyToken([PROFILE.ADMINISTRATOR]), (req, res) =>
  updateUserController.handle(req, res),
);

usersRoutes.post('/register-student', UsuarioController.createDiscente);

usersRoutes.post('/login', UsuarioController.login);

usersRoutes.delete('/:id', UsuarioController.delete);

usersRoutes.get(
  '/perfil/:id/cursos',
  verifyToken([PROFILE.ADMINISTRATOR]),
  UsuarioController.findByPerfilGroupByCurso,
);

export { usersRoutes };
