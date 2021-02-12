import { Router } from 'express';
import CertificadoController from '../../controllers/CertificadoController';

const routes = Router();

routes.get('/:id', CertificadoController.download);

export default routes;
