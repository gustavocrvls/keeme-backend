import { Router } from 'express';
import CursoController from '../../controllers/CursoController';

const routes = Router();

routes.post('/create', CursoController.create);

export default routes;