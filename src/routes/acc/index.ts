import { Router } from 'express';
import AccController from '../../controllers/AccController';

const routes = Router();

routes.get('/', AccController.index);
routes.get('/:id', AccController.show);
routes.get('/status/:id', AccController.showByStatus);
routes.get('/user/:id', AccController.showByUser);
routes.get('/user/:id/resumo', AccController.summary);
routes.get('/user/:id/completo', AccController.complete);

routes.post('/create', AccController.create);

routes.delete('/remover/:id', AccController.remover);

export default routes;



