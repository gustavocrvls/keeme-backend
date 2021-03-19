import { Router } from 'express';
import PERFIL from '../../constants/Perfil';
import CursoController from '../../controllers/CursoController';
import { verifyToken } from '../../middlewares/auth';
import { createCourseController } from '../../useCases/CreateCourse';

const routes = Router();

routes.get('/', CursoController.index);
routes.post(
  '/create',
  // verifyToken([PERFIL.ADMINISTRADOR]),
  createCourseController.handle,
);

export default routes;
