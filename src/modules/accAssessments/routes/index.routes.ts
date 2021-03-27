import { Router } from 'express';
import { PROFILE } from '../../../constants/Profile';
import { verifyToken } from '../../../middlewares/auth';

const accAssessmentsRoutes = Router();

accAssessmentsRoutes.get('/', (request, response) => {
  // return indexCourseController.handle(request, response);
});

accAssessmentsRoutes.post('/', (request, response) => {
  // return createCourseController.handle(request, response);
});

export { accAssessmentsRoutes };
