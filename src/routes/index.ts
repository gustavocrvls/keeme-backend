import { Router } from 'express';
// import multer from 'multer';
import cursoRoutes from './cursos';
import usuarioRoutes from './usuarios';
import tiposDeAccRoutes from './tipos_de_acc';
import accRoutes from './acc';
import certificadosRoutes from './certificados';
import avaliacaoDaAccRoutes from './avaliacao_da_acc';
import unidadeDeMedidaRoutes from './unidades_de_medida';
import pointsRoutes from './points/index.routes';

const routes = Router();

routes.use('/accs', accRoutes);
routes.use('/cursos', cursoRoutes);
routes.use('/usuarios', usuarioRoutes);
routes.use('/tipos-de-acc', tiposDeAccRoutes);
routes.use('/certificados', certificadosRoutes);
routes.use('/avaliacoes-das-accs', avaliacaoDaAccRoutes);
routes.use('/unidades-de-medida', unidadeDeMedidaRoutes);
routes.use('/points', pointsRoutes);

export default routes;
