import { ACCAssessment } from '../model/ACCAssessment';

export interface IACCsAssessmentsRepository {
  showByACC(accId: number): Promise<ACCAssessment>;
  create(accAssessment: ACCAssessment): Promise<void>;
}
