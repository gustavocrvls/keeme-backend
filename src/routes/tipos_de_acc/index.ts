import { Router } from 'express';
import TipoDeAccController from '../../controllers/TipoDeAccController';

const routes = Router();

routes.get('/', TipoDeAccController.index);
routes.get('/usuario/:id', TipoDeAccController.getTiposDeAccByIdUsuario);

routes.post('/', TipoDeAccController.create);
routes.post('/mass', TipoDeAccController.massCreate);

routes.delete('/remove/:id', TipoDeAccController.remove);

export default routes;




