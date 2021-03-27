import { Router } from 'express';
import pointsRoutesa from './points/index.routes';
import { courseRoutes } from '../modules/courses/routes/index.routes';
import { accAssessmentsRoutes } from '../modules/accAssessments/routes/index.routes';
import { accRoutes } from '../modules/accs/routes/index.routes';
import { userRoutes } from '../modules/users/routes/index.routes';
import { accTypesRoutes } from '../modules/accTypes/routes/index.routes';
import { certificateRoutes } from '../modules/certificates/routes/index.routes';
import { unitsOfMeasurementRoutes } from '../modules/unitsOfMeasurement/routes/index.routes';

const routes = Router();

routes.use('/courses', courseRoutes);
routes.use('/accs-assessments', accAssessmentsRoutes);
routes.use('/accs', accRoutes);
routes.use('/users', userRoutes);
routes.use('/acc-types', accTypesRoutes);
routes.use('/certificates', certificateRoutes);
routes.use('/unity_of_measurement', unitsOfMeasurementRoutes);
routes.use('/points', pointsRoutesa);

export default routes;
