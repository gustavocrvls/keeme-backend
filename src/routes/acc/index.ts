import { Router } from 'express';
import AccController from '../../controllers/AccController';
import { verifyToken } from '../../middlewares/auth';
import uploadConfig from '../../config/upload';
import multer from 'multer';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/', verifyToken, AccController.index);
routes.get('/:id', verifyToken, AccController.show);
routes.get('/status/:id', verifyToken, AccController.showByStatus);
routes.get('/user/:id', verifyToken, AccController.showByUser);
routes.get('/user/:id/resumo', verifyToken, AccController.summary);
routes.get('/user/:id/completo', verifyToken, AccController.complete);

routes.post('/create', verifyToken, upload.array('certificado'), AccController.create);

routes.delete('/remover/:id', verifyToken, AccController.remover);

export default routes;



