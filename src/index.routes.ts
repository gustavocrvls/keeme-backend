import { Router } from 'express';
import { coursesRoutes } from './modules/courses/routes/index.routes';
import { accsAssessmentsRoutes } from './modules/accsAssessments/routes/index.routes';
import { accsRoutes } from './modules/accs/routes/index.routes';
import { usersRoutes } from './modules/users/routes/index.routes';
import { accTypesRoutes } from './modules/accTypes/routes/index.routes';
import { unitsOfMeasurementRoutes } from './modules/unitsOfMeasurement/routes/index.routes';
import { pointsRoutes } from './modules/points/routes/index.routes';

const routes = Router();

routes.use('/courses', coursesRoutes);
routes.use('/accs-assessments', accsAssessmentsRoutes);
routes.use('/accs', accsRoutes);
routes.use('/users', usersRoutes);
routes.use('/acc-types', accTypesRoutes);
routes.use('/units-of-measurement', unitsOfMeasurementRoutes);
routes.use('/points', pointsRoutes);

export default routes;
