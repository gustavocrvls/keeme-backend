import { Router } from 'express';
import CursoController from '../../controllers/CursoController';
import { verifyToken } from '../../middlewares/auth';

const routes = Router();

routes.post('/create', verifyToken, CursoController.create);

export default routes;