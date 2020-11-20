import { Router } from 'express';
// import multer from 'multer';
import UsuarioController from './controllers/UsuarioController';
import TipoDeAccController from './controllers/TipoDeAccController';

const routes = Router();

routes.get('/usuarios', UsuarioController.index);
routes.get('/usuarios/:id', UsuarioController.show);
routes.post('/usuarios', UsuarioController.create);

routes.get('/tipos-de-acc', TipoDeAccController.index);
routes.post('/tipos-de-acc', TipoDeAccController.create);

export default routes;