import { Router } from 'express';
import { PROFILE } from '../../../constants/Profile';
import { verifyToken } from '../../../middlewares/auth';
import { createCourseController } from '../../../useCases/CreateCourse';
import { indexCourseController } from '../../../useCases/IndexCourse';

const courseRoutes = Router();

courseRoutes.get('/', (request, response) => {
  return indexCourseController.handle(request, response);
});

courseRoutes.post(
  '/',
  verifyToken([PROFILE.ADMINISTRATOR]),
  (request, response) => {
    return createCourseController.handle(request, response);
  },
);

export { courseRoutes };
