import { Router } from 'express';
import { PROFILE } from '../../../constants/Profile';
import { verifyToken } from '../../../middlewares/auth';
import { createCourseController } from '../useCases/CreateCourse';
import { indexCourseController } from '../useCases/IndexCourse';

const coursesRoutes = Router();

coursesRoutes.get('/', (request, response) => {
  return indexCourseController.handle(request, response);
});

coursesRoutes.post(
  '/',
  verifyToken([PROFILE.ADMINISTRATOR]),
  (request, response) => {
    return createCourseController.handle(request, response);
  },
);

export { coursesRoutes };
