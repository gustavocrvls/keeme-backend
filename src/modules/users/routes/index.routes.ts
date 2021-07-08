import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { PROFILE } from '../../../constants/Profile';
import { verifyToken } from '../../../middlewares/auth';
import { createUserController } from '../useCases/CreateUser';
import { indexUserController } from '../useCases/IndexUser';
import { loginUserController } from '../useCases/LoginUser';
import { showUserController } from '../useCases/ShowUser';
import { updateUserController } from '../useCases/UpdateUser';

const usersRoutes = Router();

// list all users
usersRoutes.get(
  '/',
  verifyToken([PROFILE.ADMINISTRATOR, PROFILE.COORDINATOR]),
  (req, res) => indexUserController.handle(req, res),
);

// get a user by id
usersRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  verifyToken([PROFILE.COORDINATOR, PROFILE.STUDENT, PROFILE.ADMINISTRATOR]),
  (req, res) => showUserController.handle(req, res),
);

// creates a new user
usersRoutes.post(
  '/',
  verifyToken([PROFILE.ADMINISTRATOR]),
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      registration: Joi.string().required(),
      email: Joi.string().required(),
      username: Joi.string().required(),
      password: Joi.string().required(),
      profile: Joi.number().required(),
      course: Joi.number().required(),
    }),
  }),
  (req, res) => createUserController.handle(req, res),
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

// usersRoutes.delete('/:id', UsuarioController.delete);

export { usersRoutes };
