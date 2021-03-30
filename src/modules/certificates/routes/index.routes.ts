import { Router } from 'express';
import CertificadoController from '../../../controllers/CertificadoController';

const certificatesRoutes = Router();

certificatesRoutes.get('/:id', CertificadoController.download);

export { certificatesRoutes };
