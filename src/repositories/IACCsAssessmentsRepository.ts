import { ACCAssessment } from '../entities/ACCAssessment';

export interface IACCsAssessmentsRepository {
  create(accAssessment: ACCAssessment): Promise<void>;
}
