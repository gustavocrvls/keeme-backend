import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../config/upload';
import { PROFILE } from '../../../constants/Profile';
import AccController from '../../../controllers/AccController';
import { verifyToken } from '../../../middlewares/auth';
import { deleteACCController } from '../../../useCases/DeleteACC';
import { indexACCController } from '../../../useCases/IndexACC';
import { createACCController } from '../useCases/CreateACC';
import { showACCController } from '../useCases/ShowACC';

const accsRoutes = Router();
const upload = multer(uploadConfig);

// get all accs
accsRoutes.get('/', verifyToken([PROFILE.STUDENT]), (req, res) =>
  indexACCController.handle(req, res),
);

// get a acc by id
accsRoutes.get(
  '/:id',
  verifyToken([PROFILE.STUDENT, PROFILE.COORDINATOR]),
  (req, res) => showACCController.handle(req, res),
);

// creates a new acc
accsRoutes.post(
  '/',
  verifyToken([PROFILE.STUDENT]),
  upload.array('certificate'),
  (req, res) => createACCController.handle(req, res),
);

// delete a acc by id
accsRoutes.delete('/:id', verifyToken([PROFILE.STUDENT]), (req, res) =>
  deleteACCController.handle(req, res),
);

accsRoutes.get(
  '/status/:id',
  verifyToken([PROFILE.COORDINATOR]),
  AccController.showByStatus,
);

accsRoutes.get(
  '/user/:id',
  verifyToken([PROFILE.STUDENT, PROFILE.COORDINATOR]),
  AccController.showByUser,
);

accsRoutes.get(
  '/user/:id/resumo',
  verifyToken([PROFILE.STUDENT]),
  AccController.summary,
);

accsRoutes.post(
  '/create',
  // verifyToken([PROFILE.STUDENT]),
  upload.array('certificate'),
  AccController.create,
);

accsRoutes.put('/update/:id/status', AccController.updateStatus);

export { accsRoutes };
