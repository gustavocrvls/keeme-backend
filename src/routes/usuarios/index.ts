import { Router } from 'express';
import PERFIL from '../../constants/Perfil';
import UsuarioController from '../../controllers/UsuarioController';
import { verifyToken } from '../../middlewares/auth';

const routes = Router();

routes.get('/', verifyToken([PERFIL.COORDENADOR]), UsuarioController.index);
routes.get('/:id', verifyToken([PERFIL.COORDENADOR]), UsuarioController.show);

routes.post('/', UsuarioController.create);
routes.post('/login', UsuarioController.login);

export default routes;

