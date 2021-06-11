import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { PROFILE } from '../../../constants/Profile';
import UsuarioController from '../../../controllers/UsuarioController';
import { verifyToken } from '../../../middlewares/auth';
import { indexUserController } from '../useCases/IndexUser';
import { loginUserController } from '../useCases/LoginUser';
import { updateUserController } from '../useCases/UpdateUser';

const usersRoutes = Router();

// list all users
usersRoutes.get(
  '/',
  verifyToken([PROFILE.ADMINISTRATOR, PROFILE.COORDINATOR]),
  (req, res) => indexUserController.handle(req, res),
);

// updates a user
usersRoutes.put(
  '/:id',
  verifyToken([PROFILE.ADMINISTRATOR]),
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  (req, res) => updateUserController.handle(req, res),
);

// do login
usersRoutes.post(
  '/login',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  (req, res) => loginUserController.handle(req, res),
);

usersRoutes.get(
  '/:id',
  verifyToken([PROFILE.COORDINATOR, PROFILE.STUDENT, PROFILE.ADMINISTRATOR]),
  UsuarioController.show,
);

usersRoutes.post(
  '/',
  verifyToken([PROFILE.ADMINISTRATOR]),
  UsuarioController.create,
);

usersRoutes.post('/register-student', UsuarioController.createDiscente);

usersRoutes.delete('/:id', UsuarioController.delete);

usersRoutes.get(
  '/perfil/:id/cursos',
  verifyToken([PROFILE.ADMINISTRATOR]),
  UsuarioController.findByPerfilGroupByCurso,
);

export { usersRoutes };
