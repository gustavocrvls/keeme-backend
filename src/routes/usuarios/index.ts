import { Router } from 'express';
import UsuarioController from '../../controllers/UsuarioController';
import { verifyToken } from '../../middlewares/auth';

const routes = Router();

routes.get('/', verifyToken, UsuarioController.index);
routes.get('/:id', verifyToken, UsuarioController.show);


routes.post('/', UsuarioController.create);
routes.post('/login', UsuarioController.login);

export default routes;

