import { Router } from 'express';
import TipoDeAccController from '../../controllers/TipoDeAccController';
import { verifyToken } from '../../middlewares/auth';

const routes = Router();

routes.get('/', verifyToken, TipoDeAccController.index);
routes.get('/usuario/:id', verifyToken, TipoDeAccController.getTiposDeAccByIdUsuario);

routes.post('/', verifyToken, TipoDeAccController.create);
routes.post('/mass', verifyToken, TipoDeAccController.massCreate);

routes.delete('/remove/:id', verifyToken, TipoDeAccController.remove);

export default routes;




