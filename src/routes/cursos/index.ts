import { Router } from 'express';
import PERFIL from '../../constants/Perfil';
import CursoController from '../../controllers/CursoController';
import { verifyToken } from '../../middlewares/auth';
import { createCourseController } from '../../useCases/CreateCourse';
import { indexCourseController } from '../../useCases/IndexCourse';

const routes = Router();

routes.get('/', (request, response) => {
  return indexCourseController.handle(request, response);
});

routes.post(
  '/create',
  // verifyToken([PERFIL.ADMINISTRADOR]),
  (request, response) => {
    return createCourseController.handle(request, response);
  },
);

export default routes;
