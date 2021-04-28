import { Router } from 'express';
import { downloadCertificateController } from '../useCases/DownloadCertificate';

const certificatesRoutes = Router();

certificatesRoutes.get('/:id', (req, res) =>
  downloadCertificateController.handle(req, res),
);

export { certificatesRoutes };
