import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../config/upload';
import { PROFILE } from '../../../constants/Profile';
import { verifyToken } from '../../../middlewares/auth';
import { deleteACCController } from '../../../useCases/DeleteACC';
import { indexACCController } from '../../../useCases/IndexACC';

const accRoutes = Router();
// const upload = multer(uploadConfig);

// get all accs
accRoutes.get('/', verifyToken([PROFILE.STUDENT]), (req, res) =>
  indexACCController.handle(req, res),
);

// delete a acc by id
accRoutes.delete('/:id', verifyToken([PROFILE.STUDENT]), (req, res) =>
  deleteACCController.handle(req, res),
);

export { accRoutes };
