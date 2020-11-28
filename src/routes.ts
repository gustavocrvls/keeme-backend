import { Router } from 'express';
// import multer from 'multer';
import UsuarioController from './controllers/UsuarioController';
import TipoDeAccController from './controllers/TipoDeAccController';
import PontuacaoController from './controllers/PontuacaoController';

const routes = Router();

routes.get('/usuarios', UsuarioController.index);
routes.get('/usuarios/:id', UsuarioController.show);
routes.post('/usuarios', UsuarioController.create);

routes.get('/tipos-de-acc', TipoDeAccController.index);
routes.post('/tipos-de-acc', TipoDeAccController.create);
routes.post('/tipos-de-acc/remove/:id', TipoDeAccController.remove);

routes.get('/pontuacoes', PontuacaoController.index);
routes.get('/pontuacoes/:id', PontuacaoController.show);
routes.get('/pontuacoes/user/:id', PontuacaoController.showByUser);
routes.get('/pontuacoes/user/:id/resumo', PontuacaoController.summary);
routes.get('/pontuacoes/user/:id/completo', PontuacaoController.complete);
routes.post('/pontuacoes/create', PontuacaoController.create);
routes.post('/pontuacoes/remover/:id', PontuacaoController.remover);

export default routes;