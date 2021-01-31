import { Router } from 'express';
import CertificadoController from '../../controllers/CertificadoController';
import { verifyToken } from '../../middlewares/auth';
import uploadConfig from '../../config/upload';
import multer from 'multer';

const routes = Router();

routes.get('/:id', CertificadoController.download);

export default routes;



