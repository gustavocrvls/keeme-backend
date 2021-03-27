import { Router } from 'express';
import multer from 'multer';
import AccController from '../../controllers/AccController';
import { verifyToken } from '../../middlewares/auth';
import uploadConfig from '../../config/upload';
import PERFIL from '../../constants/Perfil';
import { indexACCController } from '../../useCases/IndexACC';
import { deleteACCController } from '../../useCases/DeleteACC';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/', verifyToken([PERFIL.DISCENTE]), (req, res) =>
  indexACCController.handle(req, res),
);
routes.get(
  '/:id',
  verifyToken([PERFIL.DISCENTE, PERFIL.COORDENADOR]),
  AccController.show,
);
routes.get(
  '/status/:id',
  verifyToken([PERFIL.COORDENADOR]),
  AccController.showByStatus,
);
routes.get(
  '/user/:id',
  verifyToken([PERFIL.DISCENTE, PERFIL.COORDENADOR]),
  AccController.showByUser,
);
routes.get(
  '/user/:id/resumo',
  verifyToken([PERFIL.DISCENTE]),
  AccController.summary,
);

routes.post(
  '/create',
  // verifyToken([PERFIL.DISCENTE]),
  upload.array('certificado'),
  AccController.create,
);

routes.put('/update/:id/status', AccController.updateStatus);

routes.delete('/:id', verifyToken([PERFIL.DISCENTE]), (req, res) =>
  deleteACCController.handle(req, res),
);

export default routes;
