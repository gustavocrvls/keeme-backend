import { Router } from 'express';
import multer from 'multer';
import AccController from '../../controllers/AccController';
import { verifyToken } from '../../middlewares/auth';
import uploadConfig from '../../config/upload';
import { PROFILE } from '../../constants/Profile';
import { indexACCController } from '../../useCases/IndexACC';
import { deleteACCController } from '../../useCases/DeleteACC';

const routes = Router();
const upload = multer(uploadConfig);

routes.get(
  '/',
  verifyToken([PROFILE.STUDENT, PROFILE.COORDINATOR]),
  (req, res) => indexACCController.handle(req, res),
);
routes.get(
  '/:id',
  verifyToken([PROFILE.STUDENT, PROFILE.COORDINATOR]),
  AccController.show,
);
routes.get(
  '/status/:id',
  verifyToken([PROFILE.COORDINATOR]),
  AccController.showByStatus,
);
routes.get(
  '/user/:id',
  verifyToken([PROFILE.STUDENT, PROFILE.COORDINATOR]),
  AccController.showByUser,
);
routes.get(
  '/user/:id/resumo',
  verifyToken([PROFILE.STUDENT]),
  AccController.summary,
);

routes.post(
  '/create',
  // verifyToken([PROFILE.STUDENT]),
  upload.array('certificado'),
  AccController.create,
);

routes.put('/update/:id/status', AccController.updateStatus);

routes.delete('/:id', verifyToken([PROFILE.STUDENT]), (req, res) =>
  deleteACCController.handle(req, res),
);

export default routes;
