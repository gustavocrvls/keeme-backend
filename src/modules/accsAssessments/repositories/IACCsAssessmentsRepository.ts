import { ACCAssessment } from '../../../entities/ACCAssessment';

export interface IACCsAssessmentsRepository {
  showByACC(accId: number): Promise<ACCAssessment>;
  create(accAssessment: ACCAssessment): Promise<void>;
}
