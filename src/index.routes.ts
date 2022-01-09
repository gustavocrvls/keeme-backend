import { Router } from 'express';
import { coursesRoutes } from './api/courses/routes/index.routes';
import { accsAssessmentsRoutes } from './api/accsAssessments/routes/index.routes';
import { accsRoutes } from './api/accs/routes/index.routes';
import { usersRoutes } from './api/users/routes/index.routes';
import { accTypesRoutes } from './api/accTypes/routes/index.routes';
import { unitsOfMeasurementRoutes } from './api/unitsOfMeasurement/routes/index.routes';
import { pointsRoutes } from './api/points/routes/index.routes';

const routes = Router();

routes.use('/courses', coursesRoutes);
routes.use('/accs-assessments', accsAssessmentsRoutes);
routes.use('/accs', accsRoutes);
routes.use('/users', usersRoutes);
routes.use('/acc-types', accTypesRoutes);
routes.use('/units-of-measurement', unitsOfMeasurementRoutes);
routes.use('/points', pointsRoutes);

export default routes;
