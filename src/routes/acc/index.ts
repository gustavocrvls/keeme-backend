import { Router } from 'express';
import AccController from '../../controllers/AccController';
import { verifyToken } from '../../middlewares/auth';
import uploadConfig from '../../config/upload';
import multer from 'multer';
import PERFIL from '../../constants/Perfil';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/', verifyToken([PERFIL.DISCENTE]), AccController.index);
routes.get('/:id', verifyToken([PERFIL.DISCENTE]), AccController.show);
routes.get('/status/:id', verifyToken([PERFIL.DISCENTE]), AccController.showByStatus);
routes.get('/user/:id', verifyToken([PERFIL.DISCENTE]), AccController.showByUser);
routes.get('/user/:id/resumo', verifyToken([PERFIL.DISCENTE]), AccController.summary);
routes.get('/user/:id/completo', verifyToken([PERFIL.DISCENTE]), AccController.complete);

routes.post('/create', verifyToken([PERFIL.DISCENTE]), upload.array('certificado'), AccController.create);

routes.put('/update/:id/status', AccController.updateStatus);

routes.delete('/remover/:id', verifyToken([PERFIL.DISCENTE]), AccController.remover);

export default routes;



