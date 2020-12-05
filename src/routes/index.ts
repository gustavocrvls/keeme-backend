import { Router } from 'express';
// import multer from 'multer';
import cursoRoutes from './cursos';
import usuarioRoutes from './usuarios';
import tiposDeAccRoutes from './tipos_de_acc';
import accRoutes from './acc';

const routes = Router();

routes.use('/accs', accRoutes);
routes.use('/cursos', cursoRoutes);
routes.use('/usuarios', usuarioRoutes);
routes.use('/tipos-de-acc', tiposDeAccRoutes);

export default routes;