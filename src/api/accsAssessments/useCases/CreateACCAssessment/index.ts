import { MySQLACCsAssessmentsRepository } from '../../repositories/implementations/MySQLACCsAssessments';
import { MySQLACCsRepository } from '../../../accs/repositories/implementations/MySQLACCsRepository';
import { CreateACCAssessmentController } from './CreateACCAssessmentController';
import { CreateACCAssessmentUseCase } from './CreateACCAssessmentUseCase';

const mySQLACCsAssessmentsRepository = new MySQLACCsAssessmentsRepository();
const mySQLACCsRepository = new MySQLACCsRepository();

const createACCAssessmentUseCase = new CreateACCAssessmentUseCase(
  mySQLACCsAssessmentsRepository,
  mySQLACCsRepository,
);

const createACCAssessmentController = new CreateACCAssessmentController(
  createACCAssessmentUseCase,
);

export { createACCAssessmentUseCase, createACCAssessmentController };
