import { Router } from 'express';
import PERFIL from '../../constants/Perfil';
import CursoController from '../../controllers/CursoController';
import { verifyToken } from '../../middlewares/auth';

const routes = Router();

routes.post('/create', verifyToken([PERFIL.ADMINISTRADOR]), CursoController.create);

export default routes;
