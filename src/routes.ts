import { Router } from 'express';
// import multer from 'multer';
import UsuarioController from './controllers/UsuarioController';

const routes = Router();

// para testes
routes.get('/usuarios', UsuarioController.index);
routes.get('/usuarios/:id', UsuarioController.show);
routes.post('/usuarios', UsuarioController.create);

export default routes;