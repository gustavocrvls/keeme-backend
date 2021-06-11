import { Router } from 'express';
import multer from 'multer';
import { celebrate, Joi, Segments } from 'celebrate';
import uploadConfig from '../../../config/upload';
import { PROFILE } from '../../../constants/Profile';
import { verifyToken } from '../../../middlewares/auth';
import { deleteACCController } from '../useCases/DeleteACC';
import { indexACCController } from '../useCases/IndexACC';
import { createACCController } from '../useCases/CreateACC';
import { showACCController } from '../useCases/ShowACC';

const accsRoutes = Router();
const upload = multer(uploadConfig);

// get all accs
accsRoutes.get(
  '/',
  verifyToken([PROFILE.STUDENT, PROFILE.COORDINATOR]),
  (req, res) => indexACCController.handle(req, res),
);

// get a acc by id
accsRoutes.get(
  '/:id',
  verifyToken([PROFILE.STUDENT, PROFILE.COORDINATOR]),
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  (req, res) => showACCController.handle(req, res),
);

// creates a new acc
accsRoutes.post(
  '/',
  verifyToken([PROFILE.STUDENT]),
  upload.array('certificate'),
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      quantity: Joi.number().required(),
      description: Joi.string().required(),
      user: Joi.number().required(),
      acc_type: Joi.number().required(),
      acc_variant: Joi.number().required(),
    }),
  }),
  (req, res) => createACCController.handle(req, res),
);

// delete a acc by id
accsRoutes.delete(
  '/:id',
  verifyToken([PROFILE.STUDENT]),
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  (req, res) => deleteACCController.handle(req, res),
);

export { accsRoutes };
