import { Router } from 'express';
import { PROFILE } from '../../../constants/Profile';
import { verifyToken } from '../../../middlewares/auth';
import { createCourseController } from '../useCases/CreateCourse';
import { getCourseWithUsersController } from '../useCases/GetCourseWithUsers';
import { indexCourseController } from '../useCases/IndexCourse';

const coursesRoutes = Router();

coursesRoutes.get('/', (req, res) => indexCourseController.handle(req, res));

coursesRoutes.post('/', verifyToken([PROFILE.ADMINISTRATOR]), (req, res) =>
  createCourseController.handle(req, res),
);

coursesRoutes.get('/users', (req, res) =>
  getCourseWithUsersController.handle(req, res),
);

export { coursesRoutes };
