import { Router } from 'express';
import CertificadoController from '../../../controllers/CertificadoController';
import { downloadCertificateController } from '../useCases/DownloadCertificate';

const certificatesRoutes = Router();

certificatesRoutes.get('/:id', (req, res) =>
  downloadCertificateController.handle(req, res),
);

export { certificatesRoutes };
