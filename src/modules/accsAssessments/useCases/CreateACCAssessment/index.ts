import { MySQLACCsAssessmentsRepository } from '../../../../repositories/implementations/MySQLACCsAssessments';
import { CreateACCAssessmentController } from './CreateACCAssessmentController';
import { CreateACCAssessmentUseCase } from './CreateACCAssessmentUseCase';

const mySQLACCsAssessmentsRepository = new MySQLACCsAssessmentsRepository();

const createACCAssessmentUseCase = new CreateACCAssessmentUseCase(
  mySQLACCsAssessmentsRepository,
);

const createACCAssessmentController = new CreateACCAssessmentController(
  createACCAssessmentUseCase,
);

export { createACCAssessmentUseCase, createACCAssessmentController };
