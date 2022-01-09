import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { PROFILE } from '../../../constants/Profile';
import { verifyToken } from '../../../middlewares/auth';
import { createACCAssessmentController } from '../useCases/CreateACCAssessment';

const accsAssessmentsRoutes = Router();

// creates a new assessment
accsAssessmentsRoutes.post(
  '/',
  verifyToken([PROFILE.ADMINISTRATOR, PROFILE.COORDINATOR]),
  celebrate(
    {
      [Segments.BODY]: Joi.object().keys({
        description: Joi.string().required(),
        user: Joi.number().required(),
        acc: Joi.number().required(),
        acc_status: Joi.number().required(),
      }),
    },
    {
      abortEarly: false,
    },
  ),
  (req, res) => createACCAssessmentController.handle(req, res),
);

export { accsAssessmentsRoutes };
